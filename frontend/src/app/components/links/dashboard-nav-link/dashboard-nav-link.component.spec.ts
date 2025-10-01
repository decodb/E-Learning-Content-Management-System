import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavLinkComponent } from './dashboard-nav-link.component';

describe('DashboardNavLinkComponent', () => {
  let component: DashboardNavLinkComponent;
  let fixture: ComponentFixture<DashboardNavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNavLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
