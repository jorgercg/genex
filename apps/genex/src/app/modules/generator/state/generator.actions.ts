import { IGridData, IGridQuery } from '@genex/interfaces';
import { createAction, props } from '@ngrx/store';

export class GeneratorActions {
  static fetchValues = createAction(
    '[Generator] Fetch Values',
    props<{ query: IGridQuery }>()
  );
  static fetchValuesSuccess = createAction(
    '[Generator] Fetch Values Success',
    props<{ response: IGridData }>()
  );
  static fetchValuesFailure = createAction(
    '[Generator] Fetch Values Failure',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props<{ error: any }>()
  );
  static stopFetchingValues = createAction('[Generator] Stop Fetching Values');
}
