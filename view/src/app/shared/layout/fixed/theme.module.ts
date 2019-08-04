import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// dependencies
import { ComponentsModule } from '../dynamic/components.module';
import { DirectivesModule } from '../../directives/directives.module';

// imports
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { SidebarFormComponent } from './sidebar/sidebar-form/sidebar-form.component';
import { SidebarFooterComponent } from './sidebar/sidebar-footer/sidebar-footer.component';
import { SidebarMinimizerComponent } from './sidebar/sidebar-minimizer/sidebar-minimizer.component';

import { SidebarNavigationComponent } from './sidebar/sidebar-navigation/sidebar-navigation.component';
import { SidebarNavigationItemComponent } from './sidebar/sidebar-navigation/sidebar-navigation-item/sidebar-navigation-item.component';
import { SidebarNavigationLinkComponent } from './sidebar/sidebar-navigation/sidebar-navigation-link/sidebar-navigation-link.component';
import { SidebarNavigationDropdownComponent } from './sidebar/sidebar-navigation/sidebar-navigation-dropdown/sidebar-navigation-dropdown.component';
import { SidebarNavigationTitleComponent } from './sidebar/sidebar-navigation/sidebar-navigation-title/sidebar-navigation-title.component';
const APP_SIDEBAR = [
  SidebarComponent,
  SidebarHeaderComponent,
  SidebarFormComponent,
  SidebarFooterComponent,
  SidebarMinimizerComponent,
  // navigation
  SidebarNavigationItemComponent,
  SidebarNavigationLinkComponent,
  SidebarNavigationDropdownComponent,
  SidebarNavigationTitleComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // dependencies
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    RouterModule,
    // imports
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    // sidebar
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarFormComponent,
    SidebarFooterComponent,
    SidebarMinimizerComponent,
    // navigation
    SidebarNavigationComponent,
    SidebarNavigationItemComponent,
    SidebarNavigationLinkComponent,
    SidebarNavigationDropdownComponent,
    SidebarNavigationTitleComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    // sidebar
    SidebarComponent,
    SidebarNavigationComponent,
    ...APP_SIDEBAR
  ]
})
export class ThemeModule { }
