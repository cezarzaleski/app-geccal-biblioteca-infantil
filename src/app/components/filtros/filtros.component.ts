import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { SatDatepicker, SatDatepickerInputEvent, SatDatepickerRangeValue } from 'saturn-datepicker';
import { ServicoPaginado } from 'src/app/modals/selecao-com-busca-modal/interfaces/servico-paginado';
import {
  SelecaoComBuscaModalComponent,
  SelecaoComBuscaProperties
} from 'src/app/modals/selecao-com-busca-modal/selecao-com-busca-modal.component';

export interface FiltroOpcao {
  id?: any;
  nome?: string;
}

export interface FiltroBase {
  id?: string;
  nome?: string;
  placeholder?: string;
  tipo: 'selecao-unica' | 'periodo';
  opcaoPadrao?: FiltroOpcao | any;
  limpavel?: boolean;
}

export type FiltroSelecaoUnica = FiltroBase & {
  tipo: 'selecao-unica',
  id?: string;
  nome?: string;
  selecionado?: FiltroOpcao | any;
  campoId?: string;
  campoNome?: string | ((item) => string);
  servico?: ServicoPaginado<any>;
  opcoes?: FiltroOpcao[] | any;
  placeholder?: string;
  selecionadoChange?: (opcao: FiltroOpcao | any) => void;
  buscavel?: boolean;
  compor?: (termo) => any;
};

export type FiltroPeriodo = FiltroBase & {
  tipo: 'periodo',
  id?: string;
  nome?: string;
  selecionado?: [Date, Date];
  placeholder?: string;
  selecionadoChange?: (opcao: any) => void;
};

export type Filtros = FiltroSelecaoUnica | FiltroPeriodo;

class FiltroService
  implements ServicoPaginado<FiltroOpcao> {
  filtro: FiltroSelecaoUnica;

  constructor(filtro: FiltroSelecaoUnica) {
    this.filtro = filtro;
  }

  listar(termos?: string, page?: number, size?: number, extras?: any): Observable<FiltroOpcao[]> {
    return of(this.filtro.opcoes.filter(opcao => opcao
      .nome
      .toLocaleLowerCase()
      .indexOf(termos.toLocaleLowerCase()) >= 0)
    );
  }
}

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent implements OnInit {
  @Output() listaFiltrosClick?: EventEmitter<Filtros> = new EventEmitter();
  @Output() selecionadoChange?: EventEmitter<Filtros> = new EventEmitter();

  @ViewChild('picker', {static: false}) picker: SatDatepicker<Date>;

  handlePeriodoChange: (periodo: SatDatepickerRangeValue<Date>) => void;
  periodo: any;

  constructor(private modalCtrl: ModalController) {}

  _filtros: Filtros[];

  get filtros(): Filtros[] {
    return this._filtros;
  }

  @Input() set filtros(v: Filtros[]) {
    this._filtros = v;
    for (const _f of v) {
      if (_f.tipo === 'selecao-unica') {
        const f = _f as FiltroSelecaoUnica;
        if (f.servico || !f.opcoes) {
          continue;
        }
        f.servico = new FiltroService(f);
        f.campoId = f.campoId || 'id';
        f.campoNome = f.campoNome || 'nome';
        if (!f.placeholder) {
          f.placeholder = 'Selecione';
        }
      }
    }
  }

  ngOnInit() { }

  async selecaoUnicaClicked(filtro: FiltroSelecaoUnica) {
    const props: SelecaoComBuscaProperties = {
      servico: filtro.servico,
      campoId: filtro.campoId,
      campoNome: filtro.campoNome,
      pagina: 0,
      selecionadoId: filtro.selecionado ? filtro.selecionado[filtro.campoId] : null,
      mostrarBusca: filtro.buscavel,
      placeholder: filtro.placeholder,
      compor: filtro.compor
    };

    const modal = await this.modalCtrl.create({
      component: SelecaoComBuscaModalComponent,
      componentProps: props
    });

    await modal.present();
    const data = (await modal.onDidDismiss()).data;
    const selecionado = data ? data.dados : null;
    if (selecionado) {
      filtro.selecionado = selecionado;
      if (filtro.selecionadoChange) {
        filtro.selecionadoChange(filtro.selecionado);
      }
    }
  }

  async periodoClicked(filtro: FiltroPeriodo) {
    this.periodo = filtro.selecionado || [];
    this.handlePeriodoChange = (periodo: SatDatepickerRangeValue<Date>) => {
      filtro.selecionado = [periodo.begin, periodo.end];
      filtro.selecionadoChange(filtro.selecionado);
    };
    this.picker.open();
  }

  dateChanged(ev: SatDatepickerInputEvent<Date>) {
    if (this.handlePeriodoChange) {
      this.handlePeriodoChange(ev.value as SatDatepickerRangeValue<Date>);
    }
  }

  async listaFiltrosClicked(filtro: Filtros) {
    /* se houver gente ouvindo e nao houver servico, a gente emite o evento pra outras pessoas
     lidarem. */
    if (this.listaFiltrosClick.observers.length >= 1) {
      return this.listaFiltrosClick.emit(filtro);
    }

    switch (filtro.tipo) {
      case 'selecao-unica':
        await this.selecaoUnicaClicked(filtro as FiltroSelecaoUnica);
        break;
      case 'periodo':
        await this.periodoClicked(filtro as FiltroPeriodo);
        break;
      default:
        break;
    }
  }

  limparFiltroClicked(filtro: Filtros, ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    filtro.selecionado = filtro.opcaoPadrao;
    this.periodo = [];
    this.picker.beginDate = null;
    this.picker.endDate = null;
    if (filtro.selecionadoChange) {
      filtro.selecionadoChange(filtro.selecionado);
    }
  }
}
