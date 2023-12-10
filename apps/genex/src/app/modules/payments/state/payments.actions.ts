import { IPaymentsData } from '@genex/interfaces';
import { createAction, props } from '@ngrx/store';

export class PaymentsActions {
  static fetchValues = createAction('[Payments] Fetch Values');
  static fetchValuesSuccess = createAction(
    '[Payments] Fetch Values Success',
    props<{ response: IPaymentsData }>()
  );
  static fetchValuesFailure = createAction(
    '[Payments] Fetch Values Failure',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props<{ error: any }>()
  );

  static saveValues = createAction(
    '[Payments] Ssave Values',
    props<{ payload: IPaymentsData }>()
  );
  static saveValuesSuccess = createAction('[Payments] Save Values Success');
  static saveValuesFailure = createAction(
    '[Payments] Save Values Failure',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props<{ error: any }>()
  );
}
