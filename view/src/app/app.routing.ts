import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// dependencies
import {AuthGuard} from './app.auth.guard';

// containers
import {LayoutFullComponent} from './shared/layout/containers/layout-full/layout-full.component';
import {LayoutSimpleComponent} from './shared/layout/containers/layout-simple/layout-simple.component';

// pages
import {ExampleComponent} from './pages/example/example.component';
import {AccountComponent} from './pages/account/account.component';
import {Error404Component} from './shared/pages/error/404/error-404.component';

export const routes: Routes = [
  {
    path: 'acesso', component: LayoutSimpleComponent, data: {title: 'Account'},
    children: [
      {path: '', component: AccountComponent},
    ]
  },
  {path: '', redirectTo: 'example', pathMatch: 'full'},
  {
    path: '', component: LayoutFullComponent, data: {title: 'Início'},
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {path: 'example', component: ExampleComponent, data: {title: 'Example'}}
    ]
  },
  {
    path: '**', component: LayoutSimpleComponent, data: {title: 'Erro'},
    children: [
      {path: '', component: Error404Component},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
