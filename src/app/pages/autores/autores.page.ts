import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { ConfiguracaoComDados } from 'src/app/components/lista/lista.component';
import { Editora } from 'src/app/interfaces/editora';
import { HttpCacheService } from 'src/app/services/http-cache.service';
import { mergeMap, tap } from 'rxjs/operators';
import { toast } from 'src/app/util/toast';
import { errorHandler } from 'src/app/util/error';
import { loading } from 'src/app/util/loading';
import { AdicionarEditoraModalComponent } from 'src/app/modals/adicionar-editora-modal/adicionar-editora-modal.component';
import { Autor } from 'src/app/interfaces/autor';
import * as _ from 'lodash';
import { AutorService, AutorServiceFiltros } from 'src/app/services/autor.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.page.html',
  styleUrls: ['./autores.page.scss'],
})
export class AutoresPage implements OnInit {

  @ViewChild('barSearch', null) search: IonSearchbar;

  autores: ConfiguracaoComDados<Autor> = {
    configuracao: {
      totalPaginas: 10,
      transparente: true,
      colunas: [
        {
          titulo: 'Nome',
          campo: 'noAutor',
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

  private filtroRequisicao: AutorServiceFiltros;

  constructor(
    private navCtrl: NavController,
    private autorService: AutorService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private cacheService: HttpCacheService
  ) { }

  ngOnInit() {
    this.filtroRequisicao = {
      stAtivo: 1
    };
    this.carregarAutores();
  }

  pesquisar() {
    let pesquisa = null;
    const filtro: AutorServiceFiltros = {
      nome: ''
    };
    if (this.search)
      pesquisa = this.search.value;
    if (pesquisa && pesquisa.length >= 3) filtro.nome = pesquisa.toString();
    this.carregarAutores(null, filtro);
  }

  carregarAutores(page: number = 0, filtros?: AutorServiceFiltros) {
    this.filtroRequisicao = _.merge(this.filtroRequisicao, filtros);
    this.autores.configuracao.loading = true;
    this.autores.configuracao.erro = false;
    this
      .autorService
      .count(this.filtroRequisicao)
      .pipe(
        tap( (count) => {
          this.cacheService.disable();
          this.autores.configuracao.totalPaginas = Math.ceil( count / 10);
        }),
        mergeMap( () => {
          return this.autorService.listar(this.filtroRequisicao, page);
        })
      )
      .subscribe(
        (data) => {
          this.autores.data = data;
        },
        () => {
          this.autores.data = null;
          this.autores.configuracao.erro = true;
        })
      .add(() => {
        this.autores.configuracao.loading = false;
        this.cacheService.enable();
      });
  }

  paginaClicked(page) {
    this.carregarAutores(page - 1, this.filtroRequisicao);
  }

  async removerAutorClicked(editora: Editora) {
    const excluirEditora = () => {
      const subRemoverEditora = this
        .autorService
        .remover(editora.idEditora)
        .subscribe(
          () => {
            this.carregarAutores();
            toast('Autor removido com sucesso');
          },
          (e) => toast(errorHandler(e, 'Não foi remover a autor. Tente novamente mais tarde.'))
        );
      loading(subRemoverEditora);
    };

    const alert = await this.alertCtrl.create({
      header: 'Deseja remover a autor?',
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

  private editarAutorClicked(editora: Editora) {
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
    this.carregarAutores();
  }

}
