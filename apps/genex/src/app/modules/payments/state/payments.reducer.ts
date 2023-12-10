import { IPaymentsData } from '@genex/interfaces';
import { createReducer, on } from '@ngrx/store';
import { PaymentsActions } from './payments.actions';

export interface PaymentsState {
  pageData: IPaymentsData;
}

export const initialState: PaymentsState = {
  pageData: <IPaymentsData>{
    payments: [],
  },
};

export const paymentsFeatureKey = 'payments';

export const paymentsReducer = createReducer(
  initialState,
  on(PaymentsActions.fetchValuesSuccess, (state, { response }) => ({
    ...state,
    pageData: response,
  }))
);
