import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-adicionar-campo-unico-modal',
  templateUrl: './adicionar-campo-unico-modal.component.html',
  styleUrls: ['./adicionar-campo-unico-modal.component.scss'],
})
export class AdicionarCampoUnicoModalComponent implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }
  campo: string;

  ngOnInit() {}

  fecharClicked() {
    this.modalController.dismiss(
      {dismissed: true});
  }

  adicionarClicked() {
  }
}
