import { Component, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subject, filter, takeUntil } from 'rxjs';

import { IGridData, IGridQuery } from '@genex/interfaces';
import { selectGeneratorData } from '../state/generator.selectors';
import { GeneratorActions } from '../state/generator.actions';
import { WebSocketService } from '../../../services/ws.service';

@Component({
  selector: 'genex-generator',
  templateUrl: './generator.component.html',
})
export class GeneratorComponent {
  private destroyed = new Subject<void>();
  pageData: IGridData | null = null;
  socketIsConnected = false;
  isGenerating = false;
  biasRepeated = false;
  form: FormGroup;

  private lastUsedChars: { char: string; timestamp: number }[] = [];

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly wsService: WebSocketService
  ) {
    // We unsubscribe from all subscriptions when the component is destroyed
    this.destroyRef.onDestroy(() => {
      this.destroyed.next();
      this.destroyed.complete();
    });

    // We create the form for the bias input
    this.form = this.fb.group({
      bias: [null],
    });

    // We start with the bias input disabled
    this.form.get('bias')?.disable();

    // We listen for data from the server
    this.wsService
      .listenForData()
      .pipe(takeUntil(this.destroyed))
      .subscribe((response) => {
        if (this.form.get('bias')?.disabled) {
          this.form.get('bias')?.enable();
        }
        // When we receive data, we dispatch it to the store
        this.store.dispatch(GeneratorActions.fetchValuesSuccess({ response }));
      });

    // We listen for connection status changes
    this.wsService
      .getConnectionStatus()
      .pipe(takeUntil(this.destroyed))
      .subscribe((status) => {
        if (status) {
          this.socketIsConnected = true;
        } else {
          // If the connection is lost, we reset the generating flag and disable the bias input
          this.isGenerating = false;
          this.form.get('bias')?.disable();
          this.socketIsConnected = false;
        }
      });

    // We listen for data changes in the store
    this.store
      .select(selectGeneratorData)
      .pipe(
        takeUntil(this.destroyed),
        filter(
          (data) => !!data && !!data.grid && !!data.grid.length && !!data.code
        )
      )
      .subscribe((data) => {
        // When we receive data, we update the page data
        this.pageData = data;
      });

    // We check for bias changes and send them to the server
    this.form
      .get('bias')
      ?.valueChanges.pipe(
        takeUntil(this.destroyed),
        filter((value) => value !== null)
      )
      .subscribe((value: string) => {
        // We only allow letters
        const letterRegex = /^[A-Za-z]$/;
        if (!letterRegex.test(value)) {
          // If the input is not a letter, we clear it
          this.form.get('bias')?.setValue(null);
          value = '';
        } else {
          const now = Date.now();
          // We only allow a letter to be used once every 4 seconds
          const charIsValid =
            !this.lastUsedChars.some(
              (item) => item.char === value && now - item.timestamp < 4000
            ) || value === '';

          this.biasRepeated = !charIsValid;

          this.lastUsedChars = this.lastUsedChars.filter(
            (item) => now - item.timestamp < 4000
          );

          // If the letter is not valid, we clear the input
          if (!charIsValid) {
            this.form.get('bias')?.setValue(null);
            value = '';
          } else {
            // If the letter is valid, we send it to the server
            this.lastUsedChars.push({ char: value, timestamp: now });
            const query: IGridQuery = { bias: value };
            // We dispatch the query to the store to start generating
            this.store.dispatch(GeneratorActions.fetchValues({ query }));
          }
        }
      });
  }

  // We start generating when the user clicks the button
  public onGenButtonClicked(): void {
    // If we are already generating, we stop
    if (this.isGenerating) {
      this.store.dispatch(GeneratorActions.stopFetchingValues());
      this.isGenerating = false;
      // We set the bias input to null
      this.form.get('bias')?.setValue(null);
      // We disable the bias input
      this.form.get('bias')?.disable();
    } else {
      // If we are not generating, we start
      this.isGenerating = true;
      const query: IGridQuery = { bias: null };
      // We dispatch the query to the store to start generating
      this.store.dispatch(GeneratorActions.fetchValues({ query }));
      // We enable the bias input
      this.form.get('bias')?.enable();
    }
  }
}
