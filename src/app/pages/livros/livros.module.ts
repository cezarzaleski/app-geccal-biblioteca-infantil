import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LivrosPage } from './livros.page';
import { FiltrosComponentModule } from 'src/app/components/filtros/filtros.module';

const routes: Routes = [
  {
    path: '',
    component: LivrosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FiltrosComponentModule
  ],
  declarations: [LivrosPage]
})
export class LivrosPageModule {}
