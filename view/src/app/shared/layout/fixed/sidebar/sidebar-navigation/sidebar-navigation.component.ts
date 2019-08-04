import { Component } from '@angular/core';

// Import navigation elements
import { navigation } from '../../../../../sidebar-navigation/navigation';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html'
})
export class SidebarNavigationComponent {

  public navigation = navigation;

  public isDivider(item) {
    return item.divider ? true : false;
  }

  public isTitle(item) {
    return item.title ? true : false;
  }

  constructor() { }
}
