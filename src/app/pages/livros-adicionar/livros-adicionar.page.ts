import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SelecaoComBuscaModalComponent } from 'src/app/modals/selecao-com-busca-modal/selecao-com-busca-modal.component';
import { EditoraService } from 'src/app/services/editora.service';

@Component({
  selector: 'app-livros-adicionar',
  templateUrl: './livros-adicionar.page.html',
  styleUrls: ['./livros-adicionar.page.scss'],
})
export class LivrosAdicionarPage implements OnInit {
  txtBotao: any;
  form: FormGroup;
  erro: boolean;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private editoraService: EditoraService
  ) {
    this.form = fb.group({
      noLivro: ['', [Validators.required, Validators.maxLength(3), Validators.maxLength(45)]],
      nuExemplar: ['', [Validators.required, Validators.maxLength(3), Validators.maxLength(45)]],
      nuAno: ['', [Validators.required]],
      idOrigemLivro: ['', [Validators.required]],
      idEditora: ['', [Validators.required]],
      noEditora: ['', [Validators.required]],
      idAutor: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  adicionarClicked() {
    console.log('adada');
  }

  voltarClicked() {
    console.log('voltar');
  }

  async escolherEditoraClicked() {
    const modal = await this.modalCtrl.create({
      component: SelecaoComBuscaModalComponent,
      componentProps: {
        servico: this.editoraService,
        campoId: 'idEditora',
        campoNome: `noEditora`,
        compor: (termo) => ({nome: termo}),
      }
    });
    await modal.present();
    const data = (await modal.onDidDismiss()).data;

    if (!data) {
      return;
    }
    this.form.get('idEditora').setValue(data.dados.idEditora);
    this.form.get('noEditora').setValue(data.dados.noEditora);
  }
}
