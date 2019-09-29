import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { ServicoPaginado } from 'src/app/modals/selecao-com-busca-modal/interfaces/servico-paginado';

export interface SelecaoComBuscaProperties {
  servico?: ServicoPaginado<any>;
  campoId?: string;
  campoNome?: string | ((item) => string);
  pagina?: number;
  placeholder?: string;
  selecionadoId?: any;
  mostrarBusca?: boolean;
  compor: (termo) => any;
  distinctBy?: string;
}

@Component({
  selector: 'app-selecao-com-busca-modal',
  templateUrl: './selecao-com-busca-modal.component.html',
  styleUrls: ['./selecao-com-busca-modal.component.scss'],
})
export class SelecaoComBuscaModalComponent
  implements OnInit {
  searchbarControl: FormControl = new FormControl('');
  pagina: number;
  loading: boolean;
  placeholder: string;
  data: { [k: string]: any }[];
  termo: any;
  indice: any;
  mostrarBusca: boolean;
  distinctBy = '';

  set selecionado(v: any) {
    this.selecionadoId = v ? v[this.campoId] : null;
    this._selecionado = v;
  }

  get selecionado(): any { return this._selecionado; }

  _selecionado: any;
  selecionadoId: any;
  servico: ServicoPaginado<any>;
  campoId: string;
  campoNome: string | ((_: any) => string);
  extras: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
  ) {
    this.set();
  }

  set() {
    const dados: SelecaoComBuscaProperties = this.navParams.data as any;
    this.servico = dados.servico;
    this.campoId = dados.campoId || 'id';
    this.campoNome = dados.campoNome || 'nome';
    if (typeof this.campoNome !== 'string') this.nome = this.campoNome;
    this.pagina = dados.pagina || 0;
    this.placeholder = dados.placeholder || 'Digite sua busca';
    this.selecionado = { [this.campoId]: dados.selecionadoId };
    this.mostrarBusca = dados.mostrarBusca !== undefined && dados.mostrarBusca !== null ? dados.mostrarBusca : true;
    this.compor = dados.compor || this.compor;
  }

  ngOnInit() {
    this
      .searchbarControl
      .valueChanges
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        tap((termo) => {
          this.loading = true;
          this.data = [];
          this.pagina = 0;
          this.termo = termo;
        }),
        switchMap(termo => {
          return this.servico.listar(this.montarTermo(termo), 0, 20, this.extras);
        })
      )
      .subscribe((data: any[]) => {
        this.loading = false;
        this.data.push(...data);
        if (this.distinctBy) this.data = _.uniqBy(this.data, this.distinctBy);
        for (const d of this.data) {
          if (d[this.campoId] === this.selecionadoId) this.selecionado = d;
        }
      });
  }

  carregarMais(event: any) {
    this.pagina += 1;
    this.loading = true;
    this
      .servico
      .listar(this.compor(this.termo), this.pagina, 20, this.extras)
      .subscribe((data: any[]) => {
        this.loading = false;
        this.data.push(...data);
        if (this.distinctBy) this.data = _.uniqBy(this.data, this.distinctBy);
        for (const d of this.data) {
          if (d[this.campoId] === this.selecionadoId) this.selecionado = d;
        }
        event.target.complete();
      }, () => this.loading = false);
  }

  confirmarClicked() {
    this.modalCtrl.dismiss({dados: this.selecionado, index: this.indice});
  }

  fecharClicked() {
    this.modalCtrl.dismiss();
  }

  nome = (i) => {
    return i[this.campoNome as string];
  };

  compor = (termo) => termo;

  montarTermo(termo) {
    if (typeof this.compor === 'function') return this.compor(termo);
    else return termo;
  }
}
