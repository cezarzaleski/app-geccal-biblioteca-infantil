import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      login: ['71464824800', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  esqueceuSenhaClicked() {
    console.log('esqueceuSenhaClicked');
  }

  entrarClicked() {
    console.log('esqueceuSenhaClicked');
  }
}
