import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Filtros } from 'src/app/components/filtros/filtros.component';

@Component({
  selector: 'app-editoras',
  templateUrl: './editoras.page.html',
  styleUrls: ['./editoras.page.scss'],
})
export class EditorasPage implements OnInit {

  // @ViewChild('barSearch') search: IonSearchbar;

  filtros: Filtros[] = [{
    id: 'por-data',
    tipo: 'selecao-unica',
    nome: 'Por data',
    placeholder: 'Todos',
    // selecionadoChange: (situacao: FiltroOpcao) => this.carregarDados(0, { 'csVinculo': situacao.id }),
    selecionado: {
      id: '',
      nome: 'Todos',
    },
    opcoes: [],
  }];

  avisos = {
    configuracao: {
      loading: false,
      erro: false,
      erroMensagem: '',
      colunas: [
        {
          titulo: 'Comunicado',
          campo: 'nmComunicado',
          largura: '70%',
        },
        {
          titulo: 'Data • Hora',
          campo: 'nrDataHora',
          largura: '30%',
        },
      ],
      interacoes: {
        adicionar: false,
        editar: false,
        remover: false,
        indicador: true,
      },
    },
    data: [
      {
        nmComunicado: 'Encerramento das operações do PSR no exercício de 2018',
        nrDataHora: '13/12/2019 • 13:30h',
      },
      {
        nmComunicado: 'Encerramento das operações do PSR no exercício de 2018',
        nrDataHora: '13/12/2019 • 13:30h',
      },
      {
        nmComunicado: 'Encerramento das operações do PSR no exercício de 2018',
        nrDataHora: '13/12/2019 • 13:30h',
      },
      {
        nmComunicado: 'Encerramento das operações do PSR no exercício de 2018',
        nrDataHora: '13/12/2019 • 13:30h',
      },
      {
        nmComunicado: 'Encerramento das operações do PSR no exercício de 2018',
        nrDataHora: '13/12/2019 • 13:30h',
      },
      {
        nmComunicado: 'Encerramento das operações do PSR no exercício de 2018',
        nrDataHora: '13/12/2019 • 13:30h',
      },
      {
        nmComunicado: 'Encerramento das operações do PSR no exercício de 2018',
        nrDataHora: '13/12/2019 • 13:30h',
      },
      {
        nmComunicado: 'Encerramento das operações do PSR no exercício de 2018',
        nrDataHora: '13/12/2019 • 13:30h',
      },
      {
        nmComunicado: 'Encerramento das operações do PSR no exercício de 2018',
        nrDataHora: '13/12/2019 • 13:30h',
      },
      {
        nmComunicado: 'Encerramento das operações do PSR no exercício de 2018',
        nrDataHora: '13/12/2019 • 13:30h',
      }
    ],
  };

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() { }

  avisoClicked() {
    this.navCtrl.navigateForward('/app/mural-aviso-detalhe');
  }

  pesquisar() {
    console.log('pesquisar()');
  }
}
