import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// dependencies
import {ComponentsModule} from '../shared/layout/dynamic/components.module';
import {DirectivesModule} from './../shared/directives/directives.module';

// plugins
import {LaddaModule} from 'angular2-ladda';
import {NgxBootstrapModule} from '../resources/ngx-bootstrap/ngx-bootstrap.module';

// pages
import {AccountComponent} from './account/account.component';
import { ExampleComponent } from './example/example.component';
import {Error404Component} from '../shared/pages/error/404/error-404.component';

// providers
import {ExampleService} from './example/example.service';
import {AccountService} from './account/account.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    // dependencies
    ComponentsModule,
    DirectivesModule,
    // plugins
    LaddaModule,
    NgxBootstrapModule
  ],
  declarations: [
    Error404Component,
    ExampleComponent,
    AccountComponent,
    ExampleComponent
  ],
  providers: [
    ExampleService,
    AccountService
  ]
})
export class PagesModule { }
