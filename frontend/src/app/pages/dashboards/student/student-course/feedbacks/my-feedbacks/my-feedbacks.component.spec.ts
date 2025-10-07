import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeedbacksComponent } from './my-feedbacks.component';

describe('MyFeedbacksComponent', () => {
  let component: MyFeedbacksComponent;
  let fixture: ComponentFixture<MyFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFeedbacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
