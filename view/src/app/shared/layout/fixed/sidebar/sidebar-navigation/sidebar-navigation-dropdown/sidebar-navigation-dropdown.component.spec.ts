import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavigationDropdownComponent } from './sidebar-navigation-dropdown.component';

describe('SidebarNavigationDropdownComponent', () => {
  let component: SidebarNavigationDropdownComponent;
  let fixture: ComponentFixture<SidebarNavigationDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarNavigationDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNavigationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
