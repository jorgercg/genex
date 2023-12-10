import { Route } from '@angular/router';

const baseRoutes: Route[] = [
  { path: '', redirectTo: 'generator', pathMatch: 'full' },
  { path: '**', redirectTo: 'generator' },
];

const moduleRoutes: Route[] = [
  {
    path: 'generator',
    loadChildren: () =>
      import('./modules/generator/generator.module').then(
        (m) => m.GeneratorModule
      ),
  },
  {
    path: 'payments',
    loadChildren: () =>
      import('./modules/payments/payments.module').then(
        (m) => m.PaymentsModule
      ),
  },
];

export const appRoutes: Route[] = [...moduleRoutes, ...baseRoutes];
