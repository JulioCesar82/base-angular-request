import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavigationLinkComponent } from './sidebar-navigation-link.component';

describe('SidebarNavigationLinkComponent', () => {
  let component: SidebarNavigationLinkComponent;
  let fixture: ComponentFixture<SidebarNavigationLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarNavigationLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNavigationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
