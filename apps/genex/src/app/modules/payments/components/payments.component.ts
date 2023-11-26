import { Component, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { WebSocketService } from '../../../services/ws.service';
import { Subject, filter, takeUntil } from 'rxjs';
import { IGridData, IPayment, IPaymentsData } from '@genex/interfaces';
import { selectPaymentsData } from '../state/payments.selectors';
import { PaymentsActions } from '../state/payments.actions';

@Component({
  selector: 'genex-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent {
  private destroyed = new Subject<void>();
  gridData: IGridData | null = null;
  pageData: IPaymentsData | null = null;
  socketIsConnected = false;
  form: FormGroup;

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
      paymentName: [null, Validators.required],
      paymentAmount: [null, Validators.required],
    });

    // We start with the bias input disabled
    this.form.get('bias')?.disable();

    // We listen for grid data from the server
    this.wsService
      .listenForData()
      .pipe(takeUntil(this.destroyed))
      .subscribe((response) => {
        this.gridData = response;
      });

    // We listen for connection status changes
    this.wsService
      .getConnectionStatus()
      .pipe(takeUntil(this.destroyed))
      .subscribe((status) => {
        if (status) {
          this.socketIsConnected = true;
          this.form.enable();
        } else {
          this.socketIsConnected = false;
          this.form.disable();
        }
      });

    // We listen for data changes in the store
    this.store
      .select(selectPaymentsData)
      .pipe(
        takeUntil(this.destroyed),
        filter((data) => !!data && !!data.payments && !!data.payments.length)
      )
      .subscribe((data) => {
        // When we receive data, we update the page data
        this.pageData = data;
      });

    this.store.dispatch(PaymentsActions.fetchValues());
  }

  public onAddPaymentClicked(): void {
    if (this.form.valid && this.gridData) {
      const paymentName = this.form.get('paymentName')?.value;
      const paymentAmount = this.form.get('paymentAmount')?.value;
      const payment: IPayment = {
        paymentName,
        paymentAmount,
        gridData: this.gridData,
      };
      if (!this.pageData) {
        this.pageData = {
          payments: [],
        };
      }
      const payload = JSON.parse(JSON.stringify(this.pageData));
      payload.payments.push(payment);

      this.store.dispatch(
        PaymentsActions.saveValues({ payload })
      );
    }
  }
}
