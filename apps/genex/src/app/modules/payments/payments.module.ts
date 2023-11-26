import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './components/payments.component';
import { paymentsFeatureKey, paymentsReducer } from './state/payments.reducer';
import { PaymentsEffects } from './state/payments.effects';
import { GenexButtonComponent } from '@genex/button';
import { GenexInputComponent } from '@genex/input';
import { PaymentsService } from './service/payments.service';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    GenexButtonComponent,
    GenexInputComponent,
    ReactiveFormsModule,
    StoreModule.forFeature(paymentsFeatureKey, paymentsReducer),
    EffectsModule.forFeature([PaymentsEffects]),
  ],
  providers: [PaymentsService],
})
export class PaymentsModule {}
