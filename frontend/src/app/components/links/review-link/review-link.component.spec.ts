import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLinkComponent } from './review-link.component';

describe('ReviewLinkComponent', () => {
  let component: ReviewLinkComponent;
  let fixture: ComponentFixture<ReviewLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
