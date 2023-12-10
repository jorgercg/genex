import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GeneratorRoutingModule } from './generator-routing.module';
import { GeneratorComponent } from './components/generator.component';
import {
  generatorFeatureKey,
  generatorReducer,
} from './state/generator.reducer';
import { GeneratorEffects } from './state/generator.effects';
import { GenexButtonComponent } from '@genex/button';
import { GenexInputComponent } from '@genex/input';

@NgModule({
  declarations: [GeneratorComponent],
  imports: [
    CommonModule,
    GeneratorRoutingModule,
    GenexButtonComponent,
    GenexInputComponent,
    ReactiveFormsModule,
    StoreModule.forFeature(generatorFeatureKey, generatorReducer),
    EffectsModule.forFeature([GeneratorEffects]),
  ],
  providers: [],
})
export class GeneratorModule {}
