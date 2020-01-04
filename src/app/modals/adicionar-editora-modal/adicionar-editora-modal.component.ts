import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarFormGerais } from 'src/app/util/utilitarias';
import { loading } from 'src/app/util/loading';
import { toast } from 'src/app/util/toast';
import { Editora } from 'src/app/interfaces/editora';
import { EditoraService } from 'src/app/services/editora.service';

@Component({
  selector: 'app-editora-modal',
  templateUrl: './adicionar-editora-modal.component.html',
  styleUrls: ['./adicionar-editora-modal.component.scss'],
})
export class AdicionarEditoraModalComponent {

  form: FormGroup;
  erro = false;
  editora: Editora;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private editoraService: EditoraService,
  ) {
    this.form = fb.group({
      noEditora: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    });
    this.set();
  }

  set() {
    this.editora = this.navParams.get('editora');
    if (this.editora) this.form.patchValue(this.editora);
  }
  fecharClicked(dismissed: boolean) {
    this.modalController.dismiss({
      dismissed
    });
  }

  adicionarClicked() {
    if (!this.validarForm()) {
      return;
    }
    this.form.disable()
    const editora: Editora = this.form.value;
    let subEditora = this.editoraService.cadastrar(editora);
    if (this.editora) subEditora = this.editoraService.atualizar(this.editora.idEditora, editora);
    const sub = subEditora
      .subscribe(() => {
        toast(`Editora salva!`);
        this.fecharClicked(false);
      }, (e) => {
        if (e.error.Status === 400 && e.error.mensagem) {
          toast(e.error.mensagem);
        } else {
          toast(`Não foi possível realizar o cadastro da editora. Tente novamente.`);
        }
      }).add(() => this.form.enable());
    loading(sub);
  }


  validarForm() {
    if (!validarFormGerais(this.form)) {
      this.erro = true;
      return false;
    }
    this.erro = false;
    return true;
  }
}
