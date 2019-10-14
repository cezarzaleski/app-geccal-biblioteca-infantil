import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarFormGerais } from 'src/app/util/utilitarias';
import { loading } from 'src/app/util/loading';
import { toast } from 'src/app/util/toast';
import { Autor } from 'src/app/interfaces/autor';
import { AutorService } from 'src/app/services/autor.service';

@Component({
  selector: 'app-autor-modal',
  templateUrl: './adicionar-autor-modal.component.html',
  styleUrls: ['./adicionar-autor-modal.component.scss'],
})
export class AdicionarAutorModalComponent {

  form: FormGroup;
  erro = false;
  autor: Autor;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private autorService: AutorService,
  ) {
    this.form = fb.group({
      noAutor: ['', [Validators.required, Validators.maxLength(3), Validators.maxLength(45)]],
    });
    this.set();
  }

  set() {
    this.autor = this.navParams.get('autor');
    if (this.autor) this.form.patchValue(this.autor);
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
    const autor: Autor = this.form.value;
    let subAutor = this.autorService.cadastrar(autor);
    if (this.autor) subAutor = this.autorService.atualizar(this.autor.idAutor, autor);
    const sub = subAutor
      .subscribe(() => {
        toast(`Autor salvo!`);
        this.fecharClicked(false);
      }, (e) => {
        if (e.error.Status === 400 && e.error.mensagem) {
          toast(e.error.mensagem);
        } else {
          toast(`Não foi possível realizar o cadastro do autor. Tente novamente.`);
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
