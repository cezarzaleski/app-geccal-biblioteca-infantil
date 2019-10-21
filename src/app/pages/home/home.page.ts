import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Power2, TimelineLite } from 'gsap';
import { ModalController, NavController } from '@ionic/angular';
import { AutorizacaoService } from 'src/app/services/autorizacao.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  menuToggle = false;
  menuTimeline = new TimelineLite({ paused: true });
  menuButtonTimeline = new TimelineLite({ paused: true });
  menuUsuarioToggle = false;
  menuUsuarioTimeline = new TimelineLite({ paused: true });
  usuario: Usuario;
  tituloPagina = '';
  secoes = [];
  nomeUsuario: any = 'GECCAL';

  constructor(
    private autorizacaoService: AutorizacaoService,
    private usuarioService: UsuarioService,
    public router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {
    this.set();
  }

  set() {
    this.secoes = this.route.snapshot.data.menu;
    this.usuario = this.route.snapshot.data.usuario;
  }

  ngOnInit() {

    this.menuUsuarioTimeline
      .set('.menu-usuario', {
        visibility: 'inherit',
      })
      .from('.menu-usuario', .2, {
        opacity: 0,
        height: 0,
        y: -10,
        ease: Power2.easeIn,
      })
      .to('.menu-usuario-toggle ion-icon', .2, {
        rotation: -180,
      }, '-=.2');

    this.menuButtonTimeline
      .to('.menu-button--top', .3, {
        transformOrigin: '0% 50%',
        rotation: 45,
        scaleX: 1.4,
        y: -2,
      })
      .to('.menu-button--middle', .3, {
        transformOrigin: '70% 50%',
        scaleX: 0,
        opacity: 0,
      }, '-=.3')
      .to('.menu-button--bottom', .3, {
        transformOrigin: '0 50%',
        rotation: -45,
        scaleX: 1.4,
        y: 2,
      }, '-=.3');

    this.menuTimeline
      .set('.menu-lateral', {
        visibility: 'inherit',
      })
      .to('.menu-lateral-backdrop', .3, {
        visibility: 'inherit',
        opacity: 1,
        ease: Power2.easeOut,
      })
      .to('.menu-wrapper', .3, {
        visibility: 'inherit',
        left: 0,
        ease: Power2.easeOut,
      }, '-=.3');
  }
  menuToggleClicked() {
    this.menuToggle = !this.menuToggle;
    this.menuToggle ? this.menuTimeline.play() : this.menuTimeline.reverse();
    this.menuToggle ? this.menuButtonTimeline.play() : this.menuButtonTimeline.reverse();
  }

  menuUsuarioToggleClicked() {
    this.menuUsuarioToggle = !this.menuUsuarioToggle;
    this.menuUsuarioToggle ? this.menuUsuarioTimeline.play() : this.menuUsuarioTimeline.reverse();
  }

  async sairClicked() {
    await this.usuarioService.usar(null);
    await this.autorizacaoService.usar(null);
    await this.router.navigate(['/login'], { replaceUrl: true });
  }

  alterarSenhaClicked() {
    this.menuUsuarioToggleClicked();
    this.router.navigate(['/app/alterar-senha']);
  }

  menuEstabelecimentoToggle() {

  }
}
