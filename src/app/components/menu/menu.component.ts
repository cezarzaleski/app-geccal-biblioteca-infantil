import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TweenMax } from 'gsap';
import { NavigationEnd, Router } from '@angular/router';

interface MenuSecao {
  titulo?: string;
  menu: {
    id?: string;
    icone?: string;
    nome?: string;
    link?: string;
    secoes?: MenuSecao[];
  }[];
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() secoes: MenuSecao[];
  @Output() itemClick: EventEmitter<any> = new EventEmitter();
  rota = '';

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      this.rota = event.urlAfterRedirects;
    });
  }

  menuClicked(
    item: {
      id?: string;
      icone?: string;
      nome?: string;
      link?: string;
      secoes?: MenuSecao[]
    }
  ) {
    this.itemClick.emit(item);

    if (item.link) {
      this.router.navigate([item.link]);
    }

    if (item.secoes) {
      this.toggleSubMenuClicked(item);
    }
  }

  toggleSubMenuClicked(item: any) {
    if (!item.aberto) {
      TweenMax.to('.sub-secao-' + item.id, .8, {
        maxHeight: 1000,
      });
      TweenMax.to('.toggle-' + item.id + ' ion-icon', .2, {
        rotation: 180,
        // ease: Power2.easeIn,
      });
    } else {
      TweenMax.to('.sub-secao-' + item.id, .4, {
        maxHeight: 0,
      });
      TweenMax.to('.toggle-' + item.id + ' ion-icon', .2, {
        rotation: 0,
        // ease: Power2.easeIn,
      });
    }

    item.aberto = !item.aberto;
  }
}
