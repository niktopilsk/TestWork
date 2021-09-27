import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, scrollPositionRestoration: 'enabled' },
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
