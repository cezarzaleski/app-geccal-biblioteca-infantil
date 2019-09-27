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
    // canActivate: [HomeGuardService, AutorizacaoGuardService],
    resolve: {
      usuario: UsuarioResolverService,
      menu: MenuResolverService,
    },
    children: [
      {
        path: 'livros',
        loadChildren: () => import('../livros/livros.module').then(m => m.LivrosPageModule)
      },
      // {
      //   path: 'produtos',
      //   loadChildren: '../produtos/produtos.module#ProdutosPageModule'
      // },
      // {
      //   path: 'usuarios',
      //   loadChildren: '../usuarios/usuarios.module#UsuariosPageModule'
      // },
      // { path: 'produto-detalhe/:idProdutoSisbi', loadChildren: '../produto-detalhe/produto-detalhe.module#ProdutoDetalhePageModule' },
      // {
      //   path: 'alterar-senha',
      //   loadChildren: '../alterar-senha/alterar-senha.module#AlterarSenhaPageModule'
      // },
      // {
      //   path: 'em-desenvolvimento',
      //   loadChildren: '../em-desenvolvimento/em-desenvolvimento.module#EmDesenvolvimentoPageModule'
      // },
      // {
      //   path: 'mural-avisos',
      //   loadChildren: '../mural-avisos/mural-avisos.module#MuralAvisosPageModule'
      // },
      // {
      //   path: 'mural-aviso-detalhe',
      //   loadChildren: '../mural-aviso-detalhe/mural-aviso-detalhe.module#MuralAvisoDetalhePageModule'
      // },
      // {
      //   path: 'indicadores',
      //   loadChildren: '../indicadores/indicadores.module#IndicadoresPageModule'
      // },
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
