import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AutoresPage } from './autores.page';
import { FiltrosComponentModule } from 'src/app/components/filtros/filtros.module';
import { ListaComponentModule } from 'src/app/components/lista/lista.module';
import { AdicionarAutorModalModule } from 'src/app/modals/adicionar-autor-modal/adicionar-autor-modal.module';

const routes: Routes = [
  {
    path: '',
    component: AutoresPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltrosComponentModule,
    ListaComponentModule,
    AdicionarAutorModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AutoresPage]
})
export class AutoresPageModule {}
