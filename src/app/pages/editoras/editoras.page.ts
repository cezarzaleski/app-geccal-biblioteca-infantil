import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { ConfiguracaoComDados } from 'src/app/components/lista/lista.component';
import { Editora } from 'src/app/interfaces/editora';
import { EditoraService, EditoraServiceFiltros } from 'src/app/services/editora.service';
import { AdicionarEditoraModalComponent } from 'src/app/modals/adicionar-editora-modal/adicionar-editora-modal.component';
import * as _ from 'lodash';
import { mergeMap, tap } from 'rxjs/operators';

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
      // titulo: 'Editoras',
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
  ) { }

  ngOnInit() {
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
      });
  }

  paginaClicked(page) {
    console.log('paginaClicked')
    this.carregarEditoras(page - 1, this.filtroRequisicao);
  }

  private excluirEditoraClicked(item: any) {

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
