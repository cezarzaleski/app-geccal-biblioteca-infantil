import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditorasPage } from './editoras.page';
import { FiltrosComponentModule } from 'src/app/components/filtros/filtros.module';
import { ListaComponentModule } from 'src/app/components/lista/lista.module';
import { AdicionarCampoUnicoModalModule } from 'src/app/modals/adicionar-campo-unico-modal/adicionar-campo-unico-modal.module';
import { AdicionarEditoraModalModule } from 'src/app/modals/adicionar-editora-modal/adicionar-editora-modal.module';

const routes: Routes = [
  {
    path: '',
    component: EditorasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltrosComponentModule,
    ListaComponentModule,
    AdicionarCampoUnicoModalModule,
    AdicionarEditoraModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditorasPage]
})
export class EditorasPageModule {}
