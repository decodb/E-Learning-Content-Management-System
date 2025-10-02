import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNavLinkComponent } from './course-nav-link.component';

describe('CourseNavLinkComponent', () => {
  let component: CourseNavLinkComponent;
  let fixture: ComponentFixture<CourseNavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseNavLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
