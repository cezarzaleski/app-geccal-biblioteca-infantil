import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { UsuarioResolverService } from 'src/app/services/resolvers/usuario-resolver.service';
import { MenuResolverService } from 'src/app/services/resolvers/menu-resolver.service';
import { MenuComponentModule } from 'src/app/components/menu/menu.component.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    // canActivate: [AutorizacaoGuardService],
    resolve: {
      usuario: UsuarioResolverService,
      menu: MenuResolverService,
    },
    children: [
      {
        path: 'livros',
        loadChildren: () => import('../livros/livros.module').then(m => m.LivrosPageModule)
      },
      {
        path: 'editoras',
        loadChildren: () => import('../editoras/editoras.module').then(m => m.EditorasPageModule)
      },
      {
        path: 'autores',
        loadChildren: () => import('../autores/autores.module').then(m => m.AutoresPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuComponentModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
