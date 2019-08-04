import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavigationItemComponent } from './sidebar-navigation-item.component';

describe('SidebarNavigationItemComponent', () => {
  let component: SidebarNavigationItemComponent;
  let fixture: ComponentFixture<SidebarNavigationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarNavigationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNavigationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
