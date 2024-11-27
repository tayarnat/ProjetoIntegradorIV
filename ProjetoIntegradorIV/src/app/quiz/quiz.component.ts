import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Router,
  ActivatedRoute,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NgIf, NgFor, isPlatformBrowser, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    ProgressSpinnerModule,
    ScrollTopModule,
    MessagesModule,
    RouterOutlet,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    FieldsetModule,
    ButtonModule,
    PanelModule,
    CardModule,
    RadioButtonModule,
  ],
})
export class QuizComponent implements OnInit {
  provaGerada: any;
  exibirExplicacao: boolean = false;
  isLoading: boolean = true;
  messages = [
    {
      severity: 'error',
      detail:
        'Ops! Um erro ao gerar a sua prova! \n' +
        'Por favor tente voltar a pagina do gerador de provas e crie uma prova novamente.',
    },
  ];

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const requestData = history.state.data;
      if (requestData) {
        this.gerarProva(requestData);
      } else {
        this.isLoading = false;
        console.log('Nenhum dado foi recebido');
        // this.isLoading = false;
      }
    }
  }

  gerarProva(data: any) {
    const username =
      'sb-5af080c1-b5f6-4283-b336-bf807e93af56!b341417|it-rt-d28c5827trial!b55215';
    const password =
      '50da0efb-c0bc-4386-b466-9345c49ef6da$0pC0h-ZxKNfWIvLNxzjdq5HsdWISGl1CbVv2_24wPRQ=';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    this.http
      .post(
        'https://d28c5827trial.it-cpitrial06-rt.cfapps.us10-001.hana.ondemand.com/http/cpi/projeto4/call-api',
        data,
        { headers }
      )
      .subscribe(
        (res) => {
          this.provaGerada = res;
          this.isLoading = false;
          console.log(res); // Armazena a prova gerada para exibição
        },
        (error) => {
          console.error('Erro ao gerar a prova', error);
          this.isLoading = false;
        }
      );
  }

  corrigeProva(data: any) {
    const username =
      'sb-5af080c1-b5f6-4283-b336-bf807e93af56!b341417|it-rt-d28c5827trial!b55215';
    const password =
      '50da0efb-c0bc-4386-b466-9345c49ef6da$0pC0h-ZxKNfWIvLNxzjdq5HsdWISGl1CbVv2_24wPRQ=';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    this.http
      .post(
        'https://d28c5827trial.it-cpitrial06-rt.cfapps.us10-001.hana.ondemand.com/http/cpi/projeto4/corrige-questoes',
        data,
        { headers }
      )
      .subscribe(
        (res) => {
          this.exibirExplicacao = true;
          this.provaGerada = res;
        },
        (error) => {
          console.error('Erro ao gerar a prova', error);
        }
      );
  }

  onOptionChange(questao: any, opcao: string) {
    questao.resposta_usuario = opcao.charAt(0); // Armazena apenas a primeira letra da opção
  }

  voltaAoGenerator() {
    this.router.navigate(['/']);
  }

  gerarNovamente() {
    window.location.reload();
  }
}
