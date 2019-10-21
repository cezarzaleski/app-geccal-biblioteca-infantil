import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { ConfiguracaoComDados } from 'src/app/components/lista/lista.component';
import { HttpCacheService } from 'src/app/services/http-cache.service';
import { mergeMap, tap } from 'rxjs/operators';
import { toast } from 'src/app/util/toast';
import { errorHandler } from 'src/app/util/error';
import { loading } from 'src/app/util/loading';
import * as _ from 'lodash';
import { LivroService, LivroServiceFiltros } from 'src/app/services/livro.service';
import { Livro } from 'src/app/interfaces/livro';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage implements OnInit {
  @ViewChild('barSearch', null) search: IonSearchbar;

  livros: ConfiguracaoComDados<Livro> = {
    configuracao: {
      totalPaginas: 10,
      transparente: true,
      colunas: [
        {
          titulo: 'Nome',
          campo: 'noLivro',
          largura: '70%',
        },
      ],
      interacoes: {
        adicionar: false,
        editar: true,
        remover: true,
        indicador: false,
      }
    },
    data: []
  };

  private filtroRequisicao: LivroServiceFiltros;

  constructor(
    private navCtrl: NavController,
    private livroService: LivroService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private cacheService: HttpCacheService
  ) { }

  ngOnInit() {
    this.filtroRequisicao = {
      stAtivo: 1
    };
    this.carregarLivros();
  }

  pesquisar() {
    let pesquisa = null;
    const filtro: LivroServiceFiltros = {
      nome: ''
    };
    if (this.search) {
      pesquisa = this.search.value;
    }
    if (pesquisa && pesquisa.length >= 3) {
      filtro.nome = pesquisa.toString();
    }
    this.carregarLivros(null, filtro);
  }

  carregarLivros(page: number = 0, filtros?: LivroServiceFiltros) {
    this.filtroRequisicao = _.merge(this.filtroRequisicao, filtros);
    this.livros.configuracao.loading = true;
    this.livros.configuracao.erro = false;
    this
      .livroService
      .count(this.filtroRequisicao)
      .pipe(
        tap( (count) => {
          this.cacheService.disable();
          this.livros.configuracao.totalPaginas = Math.ceil( count / 10);
        }),
        mergeMap( () => {
          return this.livroService.listar(this.filtroRequisicao, page);
        })
      )
      .subscribe(
        (data) => {
          this.livros.data = data;
        },
        () => {
          this.livros.data = null;
          this.livros.configuracao.erro = true;
        })
      .add(() => {
        this.livros.configuracao.loading = false;
        this.cacheService.enable();
      });
  }

  paginaClicked(page) {
    this.carregarLivros(page - 1, this.filtroRequisicao);
  }

  async removerLivroClicked(editora: Livro) {
    const excluirLivro = () => {
      const subRemoverLivro = this
        .livroService
        .remover(editora.idLivro)
        .subscribe(
          () => {
            this.carregarLivros();
            toast('Livro removida com sucesso');
          },
          (e) => toast(errorHandler(e, 'Não foi remover a editora. Tente novamente mais tarde.'))
        );
      loading(subRemoverLivro);
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
          handler: () => excluirLivro()
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  private editarLivroClicked(editora: Livro) {
    this.adicionarClick(editora);
  }

  async adicionarClick(editora?: Livro) {
    this.navCtrl.navigateForward('/app/adicionar-livro');
  }
}
