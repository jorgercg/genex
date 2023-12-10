import { IGridData } from '@genex/interfaces';
import { createReducer, on } from '@ngrx/store';
import { GeneratorActions } from './generator.actions';

export interface GeneratorState {
  pageData: IGridData;
}

export const initialState: GeneratorState = {
  pageData: <IGridData>{
    grid: [],
    code: null,
  },
};

export const generatorFeatureKey = 'generator';

export const generatorReducer = createReducer(
  initialState,
  on(GeneratorActions.fetchValuesSuccess, (state, { response }) => ({
    ...state,
    pageData: response,
  }))
);
