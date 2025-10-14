import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuiz } from './all-quiz';

describe('AllQuiz', () => {
  let component: AllQuiz;
  let fixture: ComponentFixture<AllQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
