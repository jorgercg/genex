import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { GeneratorActions } from './generator.actions';
import { map } from 'rxjs';
import { WebSocketService } from '../../../services/ws.service';

@Injectable()
export class GeneratorEffects {
  fetchValues$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GeneratorActions.fetchValues),
        map((action) => this.webSocketService.setBias(action.query.bias ?? ''))
      ),
    { dispatch: false }
  );

  stopFetchingValues$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GeneratorActions.stopFetchingValues),
        map(() => this.webSocketService.stopGeneratingData())
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private webSocketService: WebSocketService
  ) {}
}
