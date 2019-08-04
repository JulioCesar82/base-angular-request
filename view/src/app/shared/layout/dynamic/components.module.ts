import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

// imports
import {AlertComponent} from './alert/alert.component';
import {AlertService} from './alert/alert.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RouterModule,
    // imports
    AlertComponent
  ],
  declarations: [
    AlertComponent
  ],
  providers: [AlertService]
})
export class ComponentsModule {}
