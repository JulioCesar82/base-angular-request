import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-navigation-dropdown',
  templateUrl: './sidebar-navigation-dropdown.component.html'
})
export class SidebarNavigationDropdownComponent {
  @Input() link: any;

  public isBadge() {
    return this.link.badge ? true : false;
  }

  public isIcon() {
    return this.link.icon ? true : false;
  }

  constructor() { }
}
