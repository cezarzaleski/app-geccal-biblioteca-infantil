import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { LivrosAdicionarPage } from 'src/app/pages/livros-adicionar/livros-adicionar.page';


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
    RouterModule.forChild(routes)
  ],
  declarations: [LivrosAdicionarPage]
})
export class LivrosAdicionarPageModule {}
