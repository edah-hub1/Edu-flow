import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './question-form.html',
  styleUrls: ['./question-form.css']
})
export class QuestionForm {
  questionsForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.questionsForm = this.fb.group({
      questionRequest: this.fb.array([])
    });
  }

  // Getter for questions
  get questions(): FormArray {
    return this.questionsForm.get('questionRequest') as FormArray;
  }

  // Getter for options inside a given question
  options(i: number): FormArray {
    return this.questions.at(i).get('optionRequest') as FormArray;
  }

  // Add a question
  addQuestion() {
    const qGroup = this.fb.group({
      questionText: ['', Validators.required],
      type: ['SINGLE_CHOICE', Validators.required],
      points: [1, Validators.min(1)],
      explanation: [''],
      optionRequest: this.fb.array([])
    });
    this.questions.push(qGroup);
  }

  // Add option to a given question
  addOption(qIndex: number) {
    this.options(qIndex).push(
      this.fb.group({
        optionText: ['', Validators.required],
        correct: [false]
      })
    );
  }

  removeQuestion(i: number) {
    this.questions.removeAt(i);
  }

  removeOption(qIndex: number, oIndex: number) {
    this.options(qIndex).removeAt(oIndex);
  }
 
  saveQuiz() {
    console.log('Quiz payload:', this.questionsForm.value);
  }
}
