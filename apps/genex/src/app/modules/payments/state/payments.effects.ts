import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PaymentsActions } from './payments.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
// import { WebSocketService } from '../../../services/ws.service';
import { PaymentsService } from '../service/payments.service';

@Injectable()
export class PaymentsEffects {
  fetchValues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentsActions.fetchValues),
      mergeMap(() =>
        this.paymentsService.getPaymentsData().pipe(
          map((response) => PaymentsActions.fetchValuesSuccess({ response })),
          catchError((error) =>
            of(PaymentsActions.fetchValuesFailure({ error }))
          )
        )
      )
    )
  );

  saveValues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentsActions.saveValues),
      mergeMap((action) =>
        this.paymentsService.setPaymentsData(action.payload).pipe(
          map(() => PaymentsActions.fetchValues()),
          catchError((error) =>
            of(PaymentsActions.saveValuesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private paymentsService: PaymentsService
  ) {}
}
