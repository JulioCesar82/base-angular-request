import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// sidebar
import {SidebarMinimizerDirective} from './sidebar/sidebar-minimizer.directive';
import {SidebarTogglerDirective} from './sidebar/sidebar-toggler.directive';
import {SidebarCloseDirective} from './sidebar/sidebar-close.directive';
import {SidebarTogglerMobileDirective} from './sidebar/sidebar-toggler-mobile.directive';

// replace
import {ReplaceDirective} from './replace/replace.directive';

// nav dropdown
import {NavDropdownDirective} from './nav-dropdown/nav-dropdown.directive';
import {NavDropdownToggleDirective} from './nav-dropdown/nav-dropdown-toggle.directive';

// brand
import {BrandMinimizedDirective} from './brand/brand-minimized.directive';

// input mask
import {InputMaskDirective} from './input-mask/input-mask.directive';

const SIDEBAR = [
  SidebarMinimizerDirective,
  SidebarTogglerDirective,
  SidebarCloseDirective,
  SidebarTogglerMobileDirective
];

const DROPDOWN = [
  NavDropdownDirective,
  NavDropdownToggleDirective
];


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    // sidebar
    SidebarMinimizerDirective,
    SidebarTogglerDirective,
    SidebarCloseDirective,
    SidebarTogglerMobileDirective,
    // replace
    ReplaceDirective,
    // dropdown
    NavDropdownDirective,
    NavDropdownToggleDirective,
    // brand
    BrandMinimizedDirective,
    // input mask
    InputMaskDirective
  ],
  declarations: [
    ...SIDEBAR,
    ReplaceDirective,
    ...DROPDOWN,
    BrandMinimizedDirective,
    InputMaskDirective
  ]
})
export class DirectivesModule {}
