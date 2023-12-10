import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentsState, paymentsFeatureKey } from './payments.reducer';


export const selectPaymentsFeature =
  createFeatureSelector<PaymentsState>(paymentsFeatureKey);

export const selectPaymentsData = createSelector(
  selectPaymentsFeature,
  (state: PaymentsState) => state.pageData
);
