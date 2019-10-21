import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', redirectTo: 'sge', pathMatch: 'prefix' },
  { path: 'sge', redirectTo: 'app', pathMatch: 'prefix' },
  {
    path: 'app',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)},
  { path: 'editoras', loadChildren: './pages/editoras/editoras.module#EditorasPageModule' },
  { path: 'livros-adicionar', loadChildren: './livros-adicionar/livros-adicionar.module#LivrosAdicionarPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
