import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from 'src/app/components/menu-popover/popover-menu.component';

interface Coluna {
  titulo: string;
  campo: string | ((item) => string);
  largura: any;
  handler?: ((item) => void);
}

export interface Acao {
  nome: string;
  handler?: (item) => void;
}

export interface Configuracao {
  colunas?: Coluna[];
  transparente?: boolean;
  titulo?: string;
  totalPaginas?: number;
  loading?: boolean;
  vazioMensagem?: string;
  erro?: boolean;
  erroMensagem?: string;
  changeDetectionStrategy?: ChangeDetectionStrategy;
  desabilitado?: (item) => boolean;
  interacoes?: {
    adicionar?: boolean;
    editar?: boolean;
    remover?: boolean;
    indicador?: boolean;
  };
  acoes?: Acao[] | ((item) => Acao[]);
}

export type Data<T> = T[];

export interface ConfiguracaoComDados<T> {
  configuracao?: Configuracao;
  data?: Data<T>;
}

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  @Input() config: Configuracao;
  @Input() data: any[];
  @Input() pagina: string;
  @Output() itemClick: EventEmitter<any> = new EventEmitter();
  @Output() adicionarClick: EventEmitter<any> = new EventEmitter();
  @Output() editarClick: EventEmitter<any> = new EventEmitter();
  @Output() removerClick: EventEmitter<any> = new EventEmitter();
  @Output() paginaClick?: EventEmitter<any> = new EventEmitter();

  espacamentoInteracoes = 0;
  paginaSelecionada = 1;

  constructor(
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
    private popoverCtrl: PopoverController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // faz uma rodada de detectchanges independente da opcao de changeDetectionStrategy
    setTimeout(() => this.cd.detectChanges(), 100);
    if (!this.config || !this.config.interacoes) return;

    if (this.config.changeDetectionStrategy === ChangeDetectionStrategy.OnPush) {
      this.cd.detach();
    }

    if (this.config.interacoes.indicador) {
      this.espacamentoInteracoes = this.espacamentoInteracoes + 25;
    }
    if (this.config.interacoes.remover) {
      this.espacamentoInteracoes = this.espacamentoInteracoes + 50;
    }
    if (this.config.interacoes.editar) {
      this.espacamentoInteracoes = this.espacamentoInteracoes + 50;
    }
    if (this.config.acoes) {
      this.espacamentoInteracoes = this.espacamentoInteracoes + 50;
    }
  }

  itemClicked(item: any) { this.itemClick.emit(item); }
  adicionarClicked() { this.adicionarClick.emit(); }
  editarClicked(item: any) { this.editarClick.emit(item); }
  removerClicked(item: any) {
    this.presentAlertConfirm(item);
  }

  async presentAlertConfirm(item: any) {
    const alert = await this.alertController.create({
      message: 'Deseja remover este item?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.confirmaRemover(item);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmaRemover(item: any) {
    this.removerClick.emit(item);
  }

  private render(coluna: Coluna, item: any) {
    let conteudo = '';
    if (typeof coluna.campo === 'function') {
      conteudo = coluna.campo(item);
    } else {
      conteudo = item[coluna.campo];
    }
    if (typeof coluna.campo === 'string' && conteudo && conteudo.match(/<[a-z][\s\S]*>/i)) {
      /* caso o conteudo seja um HTML, pede desculpa pra policia do HTML */
      return this.sanitizer.bypassSecurityTrustHtml(conteudo);
    }
    return conteudo;
  }

  paginaClicked(pagina: any) {
    this.paginaSelecionada = pagina;
    this.paginaClick.emit(pagina);
  }

  paginacao(atual, ultimo) {
    const delta = 2,
      esquerda = atual - delta,
      direita = atual + delta + 1,
      alcance = [],
      alcanceComReticencias = [];
    let auxiliar = null;

    for (let i = 1; i <= ultimo; i++) {
      if (i === 1 || i === ultimo || i >= esquerda && i < direita) {
        alcance.push(i);
      }
    }

    for (const j of alcance) {
      if (auxiliar) {
        if (j - auxiliar === 2) {
          alcanceComReticencias.push(auxiliar + 1);
        } else if (j - auxiliar !== 1) {
          alcanceComReticencias.push('...');
        }
      }
      alcanceComReticencias.push(j);
      auxiliar = j;
    }

    return alcanceComReticencias;
  }

  colunaClicked(coluna: Coluna, item: any) {
    if (coluna.handler) {
      coluna.handler(item);
    }
  }

  zap() {
    this.cd.reattach();
    this.cd.detectChanges();
    setTimeout(() => {
      if (this.config.changeDetectionStrategy === ChangeDetectionStrategy.OnPush) {
        this.cd.detach();
      }
    }, 1);
  }

  async acoesClicked(item: any, event: any) {
    const acoes = this.acoes(item);
    if (!acoes || !acoes.length) return;
    const popover = await this.popoverCtrl.create({
      component: PopoverMenuComponent,
      event,
      componentProps: {
        acoes: this.acoes(item),
        item,
      }
    });
    await popover.present();
  }

  desabilitado(item: any): boolean {
    return this.config.desabilitado && this.config.desabilitado(item);
  }

  acoes(item: any): Acao[] {
    if (typeof this.config.acoes === 'function') return this.config.acoes(item);
    return this.config.acoes;
  }
}
