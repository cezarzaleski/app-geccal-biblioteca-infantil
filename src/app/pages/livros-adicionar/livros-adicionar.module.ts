import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { LivrosAdicionarPage } from 'src/app/pages/livros-adicionar/livros-adicionar.page';
import { SelecaoComBuscaModalModule } from 'src/app/modals/selecao-com-busca-modal/selecao-com-busca-modal.module';


const routes: Routes = [
  {
    path: '',
    component: LivrosAdicionarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SelecaoComBuscaModalModule
  ],
  declarations: [LivrosAdicionarPage]
})
export class LivrosAdicionarPageModule {}
