import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-livros-adicionar',
  templateUrl: './livros-adicionar.page.html',
  styleUrls: ['./livros-adicionar.page.scss'],
})
export class LivrosAdicionarPage implements OnInit {
  txtBotao: any;
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      noLivro: ['', [Validators.required, Validators.maxLength(3), Validators.maxLength(45)]],
      nuExemplar: ['', [Validators.required, Validators.maxLength(3), Validators.maxLength(45)]],
      nuAno: ['', [Validators.required, Validators.maxLength(3), Validators.maxLength(45)]],
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
}
