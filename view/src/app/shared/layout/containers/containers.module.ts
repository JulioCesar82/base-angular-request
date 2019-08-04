import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// dependencies
import {ThemeModule} from '../fixed/theme.module';
import {ComponentsModule} from '../dynamic/components.module';

// imports
import {LayoutFullComponent} from './layout-full/layout-full.component';
import {LayoutSimpleComponent} from './layout-simple/layout-simple.component';


@NgModule({
  imports: [
    CommonModule,
    // dependencies
    ThemeModule,
    ComponentsModule
  ],
  exports: [
    LayoutFullComponent,
    LayoutSimpleComponent
  ],
  declarations: [LayoutFullComponent, LayoutSimpleComponent]
})
export class ContainersModule {}
