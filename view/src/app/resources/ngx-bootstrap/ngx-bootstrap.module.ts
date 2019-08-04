import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// imports
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    // imports
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: [TabsModule, BsDropdownModule, TooltipModule, ModalModule]
})
export class NgxBootstrapModule {
}
