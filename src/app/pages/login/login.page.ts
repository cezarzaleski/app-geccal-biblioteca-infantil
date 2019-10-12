import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorizacaoService } from 'src/app/services/autorizacao.service';
import { mergeMap } from 'rxjs/operators';
import { toast } from 'src/app/util/toast';
import { loading } from 'src/app/util/loading';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private autorizacaoService: AutorizacaoService,
    private router: Router
  ) {
    this.form = fb.group({
      login: ['geccal', [Validators.required]],
      senha: ['123456', [Validators.required]],
    });
  }

  esqueceuSenhaClicked() {
    console.log('esqueceuSenhaClicked');
  }

  entrarClicked() {
    const login   = this.form.get('login').value,
      senha = this.form.get('senha').value;
    const sub = this
      .autorizacaoService
      .obter(login, senha)
      .pipe(
        mergeMap((auth) => this.autorizacaoService.usar(auth)),
      )
      .subscribe(
        (usuario) => {
          this.router.navigate(['/app', 'editoras'], {replaceUrl: true});
        },
        err => {
          let msg = err.message;
          if (err.status === 401) {
            msg = 'Não foi possível autorizar usando as credenciais fornecidas. Verifique os dados e tente novamente.';
          }
          if (err.status === 403) {
            msg = 'O seu perfil não têm permissão para acessar essa aplicação.';
          }
          toast(msg);
        }
      );
    loading(sub);
  }
}
