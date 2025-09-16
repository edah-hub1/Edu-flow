
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { MatInputModule } from "@angular/material/input";


@Component({
  selector: 'app-quiz',
  imports: [MatInputModule, ReactiveFormsModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class Quiz {
getOptions(_t20: number) {
throw new Error('Method not implemented.');
}
  quizForm: FormGroup;
  moduleId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    this.addQuestion(); // start with one question
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(
      this.fb.group({
        text: ['', Validators.required],
        options: this.fb.array([
          this.fb.control('', Validators.required),
          this.fb.control('', Validators.required),
        ]),
        correctAnswer: [0],
      })
    );
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  addOption(questionIndex: number) {
    const options = this.questions.at(questionIndex).get('options') as FormArray;
    options.push(this.fb.control('', Validators.required));
  }

  submit() {
    if (this.quizForm.invalid) return;

    const quizPayload = {
      ...this.quizForm.value,
      moduleId: this.moduleId,
    };

    this.loading = true;
    this.quizService.createQuiz(quizPayload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/courses', quizPayload.moduleId, 'modules']); // redirect after save
      },
      error: () => (this.loading = false),
    });
  }
}
