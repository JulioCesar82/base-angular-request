import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:max-line-length
  selector: '[appReplace], app-aside, app-breadcrumbs, app-footer, app-header, app-sidebar, app-sidebar-footer, app-sidebar-form, app-sidebar-header, app-sidebar-minimizer, app-sidebar-nav, app-sidebar-dropdown, app-sidebar-item, app-sidebar-link, app-sidebar-title'
})
export class ReplaceDirective {
  constructor(private el: ElementRef) { }

  // wait for the component to render completely
  ngOnInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }
}
