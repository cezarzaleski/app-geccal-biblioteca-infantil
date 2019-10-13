import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { ConfiguracaoComDados } from 'src/app/components/lista/lista.component';
import { Editora } from 'src/app/interfaces/editora';
import { EditoraService, EditoraServiceFiltros } from 'src/app/services/editora.service';
import { AdicionarEditoraModalComponent } from 'src/app/modals/adicionar-editora-modal/adicionar-editora-modal.component';
import * as _ from 'lodash';
import { mergeMap, tap } from 'rxjs/operators';
import { toast } from 'src/app/util/toast';
import { errorHandler } from 'src/app/util/error';
import { loading } from 'src/app/util/loading';
import { HttpCacheService } from 'src/app/services/http-cache.service';

@Component({
  selector: 'app-editoras',
  templateUrl: './editoras.page.html',
  styleUrls: ['./editoras.page.scss'],
})
export class EditorasPage implements OnInit {

  @ViewChild('barSearch', null) search: IonSearchbar;

  editoras: ConfiguracaoComDados<Editora> = {
    configuracao: {
      totalPaginas: 10,
      transparente: true,
      colunas: [
        {
          titulo: 'Nome',
          campo: 'noEditora',
          largura: '70%',
        },
      ],
      interacoes: {
        adicionar: true,
        editar: true,
        remover: true,
        indicador: false,
      }
    },
    data: []
  };

  private filtroRequisicao: EditoraServiceFiltros;

  constructor(
    private navCtrl: NavController,
    private editoraService: EditoraService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private cacheService: HttpCacheService
  ) { }

  ngOnInit() {
    this.filtroRequisicao = {
      stAtivo: 1
    };
    this.carregarEditoras();
  }

  pesquisar() {
    let pesquisa = null;
    const filtro: EditoraServiceFiltros = {
      nome: ''
    };
    if (this.search)
      pesquisa = this.search.value;
    if (pesquisa && pesquisa.length >= 3) filtro.nome = pesquisa.toString();
    this.carregarEditoras(null, filtro);
  }

  carregarEditoras(page: number = 0, filtros?: EditoraServiceFiltros) {
    this.filtroRequisicao = _.merge(this.filtroRequisicao, filtros);
    this.editoras.configuracao.loading = true;
    this.editoras.configuracao.erro = false;
    this
      .editoraService
      .count(this.filtroRequisicao)
      .pipe(
        tap( (count) => {
          this.cacheService.disable();
          this.editoras.configuracao.totalPaginas = Math.ceil( count / 10);
        }),
        mergeMap( () => {
          return this.editoraService.listar(this.filtroRequisicao, page);
        })
      )
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
        this.cacheService.enable();
      });
  }

  paginaClicked(page) {
    this.carregarEditoras(page - 1, this.filtroRequisicao);
  }

  async removerEditoraClicked(editora: Editora) {
    const excluirEditora = () => {
      const subRemoverEditora = this
        .editoraService
        .remover(editora.idEditora)
        .subscribe(
          () => {
            this.carregarEditoras();
            toast('Editora removida com sucesso');
          },
          (e) => toast(errorHandler(e, 'Não foi remover a editora. Tente novamente mais tarde.'))
        );
      loading(subRemoverEditora);
    };

    const alert = await this.alertCtrl.create({
      header: 'Deseja remover a editora?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel'
        },
        {
          text: 'SIM',
          role: 'confirm',
          handler: () => excluirEditora()
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  private editarEditoraClicked(editora: Editora) {
    this.adicionarClick(editora);
  }

  async adicionarClick(editora?: Editora) {
    const modal = await this.modalCtrl.create({
      component: AdicionarEditoraModalComponent,
      componentProps: {
        editora
      }
    });
    await modal.present();
    const data = (await modal.onDidDismiss()).data;
    if (!data || data.dismissed) { return; }
    this.carregarEditoras();
  }
}
