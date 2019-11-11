import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { SelecaoComBuscaModalComponent } from 'src/app/modals/selecao-com-busca-modal/selecao-com-busca-modal.component';
import { EditoraService } from 'src/app/services/editora.service';
import { LivroService } from 'src/app/services/livro.service';
import { validarFormGerais } from 'src/app/util/utilitarias';
import { Livro } from 'src/app/interfaces/livro';
import { toast } from 'src/app/util/toast';
import { loading } from 'src/app/util/loading';
import { errorHandler } from 'src/app/util/error';

@Component({
  selector: 'app-livros-adicionar',
  templateUrl: './livros-adicionar.page.html',
  styleUrls: ['./livros-adicionar.page.scss'],
})
export class LivrosAdicionarPage implements OnInit {
  txtBotao = 'Salvar';
  form: FormGroup;
  erro = true;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private editoraService: EditoraService,
    private livroService: LivroService,
    private navCtrl: NavController,
  ) {
    this.form = fb.group({
      // noLivro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      noLivro: [''],
      nuEdicao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      nuAno: ['', [Validators.required]],
      editora: fb.group({
        idEditora: ['', Validators.required],
        noEditora: ['', Validators.required],
      }),
      autor: fb.group({
        idAutor: ['', Validators.required],
        noAutor: ['', Validators.required],
      }),
      origemLivro: fb.group({
        idOrigemLivro: ['', Validators.required],
      }),
    });
  }

  ngOnInit() {
    this.erro = false;
    console.log(this.erro);
  }

  adicionarClicked() {
    this.erro = !validarFormGerais(this.form);
    console.log(this.form.get('noLivro').valid)
    console.log('erro ao adicionar', this.erro);
    if (this.erro) { return; }
    const livro: Livro = this.form.value;
    const cadastro = this.livroService
      .cadastrar(livro)
      .subscribe(() => {
          toast('Usuário salvo com sucesso!');
        },
        (e) => {
          errorHandler(e, 'Não foi possível salvar as informações. Tente novamente.');
        });
    loading(cadastro);
  }

  voltarClicked() {
    this.navCtrl.back();
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
    this.form.get('editora').get('idEditora').setValue(data.dados.idEditora);
    this.form.get('editora').get('noEditora').setValue(data.dados.noEditora);
  }
}
