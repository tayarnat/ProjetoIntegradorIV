import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { GeneratorComponent } from './generator/generator.component';

export const routes: Routes = [
  { path: '', component: GeneratorComponent },
  { path: 'quiz', component: QuizComponent },
];
