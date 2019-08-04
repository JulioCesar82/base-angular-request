import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavigationTitleComponent } from './sidebar-navigation-title.component';

describe('SidebarNavigationTitleComponent', () => {
  let component: SidebarNavigationTitleComponent;
  let fixture: ComponentFixture<SidebarNavigationTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarNavigationTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNavigationTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
