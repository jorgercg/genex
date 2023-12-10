import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeneratorState, generatorFeatureKey } from './generator.reducer';

export const selectGeneratorFeature =
  createFeatureSelector<GeneratorState>(generatorFeatureKey);

export const selectGeneratorData = createSelector(
  selectGeneratorFeature,
  (state: GeneratorState) => state.pageData
);
