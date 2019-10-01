import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

export interface Acao {
  nome: string;
  handler?: (item) => any;
}

@Component({
  templateUrl: 'popover-menu.component.html'
})
export class PopoverMenuComponent {
  @Input() acoes: Acao[];
  @Input() item: any;

  constructor(private popCtrl: PopoverController) { }

  acaoClicked(acao: Acao) {
    let resultado;
    if (acao.handler) resultado = acao.handler(this.item);
    this.popCtrl.dismiss({
      acao,
      item: this.item,
      resultado
    });
  }
}
