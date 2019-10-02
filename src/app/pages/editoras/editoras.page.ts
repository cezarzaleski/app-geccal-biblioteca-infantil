import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Filtros } from 'src/app/components/filtros/filtros.component';
import { ConfiguracaoComDados } from 'src/app/components/lista/lista.component';
import { Editora } from 'src/app/interfaces/editora';
import { EditoraService } from 'src/app/services/editora.service';

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

  editoras: ConfiguracaoComDados<Editora> = {
    configuracao: {
      transparente: true,
      titulo: 'Portarias SISBI',
      desabilitado: item => item.idPortariaRevogacao !== null,
      colunas: [
        {
          titulo: 'Descrição',
          campo: 'noEditora',
          largura: '70%',
        },
      ],
      interacoes: {
        adicionar: true,
        editar: true,
        remover: true,
        indicador: false,
      },
      acoes: (x) => {
        return [
          {
            nome: 'Excluir',
            handler: item => this.excluirEditoraClicked(item)
          },
          {
            nome: 'Editar',
            handler: item => this.editarEditoraClicked(item)
          }
        ];
      }
    },
    data: []
  };

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
    private editoraService: EditoraService,
  ) { }

  ngOnInit() {
    this.carregarEditoras();
  }

  avisoClicked() {
    this.navCtrl.navigateForward('/app/mural-aviso-detalhe');
  }

  pesquisar() {
    console.log('pesquisar()');
  }

  carregarEditoras(page: number = 0) {
    this.editoras.configuracao.loading = true;
    this.editoras.configuracao.erro = false;
    this
      .editoraService
      .listar({}, page)
      .subscribe(
        (data) => {
          this.editoras.data = data;
        },
        () => {
          this.editoras.data = null;
          this.editoras.configuracao.erro = true;
        })
      .add(() => {
        this.editoras.configuracao.loading = false;
      });
  }

  private excluirEditoraClicked(item: any) {

  }

  private editarEditoraClicked(item: any) {

  }
}
