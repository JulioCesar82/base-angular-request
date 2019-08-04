import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-navigation-link',
  templateUrl: './sidebar-navigation-link.component.html'
})
export class SidebarNavigationLinkComponent {
  @Input() link: any;

  public hasVariant() {
    return this.link.variant ? true : false;
  }

  public isBadge() {
    return this.link.badge ? true : false;
  }

  public isExternalLink() {
    return this.link.url.substring(0, 4) === 'http' ? true : false;
  }

  public isIcon() {
    return this.link.icon ? true : false;
  }

  constructor() { }
}
