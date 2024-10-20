import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    FloatLabelModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectButtonModule,
    InputNumberModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  quizForm!: FormGroup;
  totalQuestoesDisponiveis: number = 0;
  niveis = [
    { label: 'Fácil', value: 'facil' },
    { label: 'Médio', value: 'medio' },
    { label: 'Difícil', value: 'dificil' },
  ];
  tipoQuests = [
    { label: 'Objetiva', value: 'Objetiva' },
    { label: 'Verdadeiro ou falso', value: 'Verdadeiro ou falso' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      materia: ['', Validators.required],
      assunto: ['', Validators.required],
      nivel: ['', Validators.required],
      tot_quest: ['', [Validators.required, Validators.max(15)]],
      tipo_quest: this.fb.array([this.createTipoQuest()]),
    });

    this.quizForm.get('tot_quest')?.valueChanges.subscribe((totalQuestoes) => {
      this.totalQuestoesDisponiveis = totalQuestoes;
      this.atualizarLimiteQuestoes();
    });
  }

  createTipoQuest(): FormGroup {
    return this.fb.group({
      qtd_quest: [
        '',
        [Validators.required, Validators.max(this.totalQuestoesDisponiveis)],
      ],
      tipo_quest: ['', Validators.required],
    });
  }

  addTipoQuest(): void {
    if (this.totalQuestoesDisponiveis > 0) {
      this.tipoQuestArray.push(this.createTipoQuest());
      this.atualizarLimiteQuestoes();
    } else {
      console.log('Limite de questões atingido');
    }
  }

  get tipoQuestArray(): FormArray {
    return this.quizForm.get('tipo_quest') as FormArray;
  }

  atualizarLimiteQuestoes(): void {
    const totalQuestoes = this.quizForm.get('tot_quest')?.value || 0;
    const questoesAlocadas = this.tipoQuestArray.controls.reduce(
      (total, control) => {
        const qtdValue = control.get('qtd_quest')?.value || 0;
        return total + qtdValue;
      },
      0
    );

    this.totalQuestoesDisponiveis = totalQuestoes - questoesAlocadas;

    this.tipoQuestArray.controls.forEach((control) => {
      const qtdControl = control.get('qtd_quest');
      const qtdAtual = qtdControl?.value || 0;
      const maxValue = this.totalQuestoesDisponiveis + qtdAtual;

      qtdControl?.setValidators([
        Validators.required,
        Validators.max(maxValue),
      ]);
      qtdControl?.updateValueAndValidity();
    });

    if (this.totalQuestoesDisponiveis <= 0) {
      const ultimoControl = this.tipoQuestArray.at(
        this.tipoQuestArray.length - 1
      );
      if (!ultimoControl.get('qtd_quest')?.value) {
        this.tipoQuestArray.removeAt(this.tipoQuestArray.length - 1);
      }
    }
  }

  onSubmit() {
    if (this.quizForm.valid) {
      const formData = this.quizForm.value;
      console.log('Navigating to quiz page with data:', formData);
      this.router.navigate(['/quiz'], { state: { data: formData } });
    } else {
      console.log('Form is invalid');
      this.verificarControlesInvalidos(this.quizForm);
    }
  }

  verificarControlesInvalidos(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.verificarControlesInvalidos(control);
      } else {
        if (control?.invalid) {
          console.log(`Campo inválido: ${key}`, control.errors);
        }
      }
    });
  }
}
