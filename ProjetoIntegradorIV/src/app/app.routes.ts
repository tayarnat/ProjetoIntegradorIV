import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
  { path: 'generator', component: AppComponent }, // Página de quiz
  { path: 'quiz', component: QuizComponent }, // Página de quiz
];
