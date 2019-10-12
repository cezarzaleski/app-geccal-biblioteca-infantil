import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdicionarEditoraModalComponent } from 'src/app/modals/adicionar-editora-modal/adicionar-editora-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [
    AdicionarEditoraModalComponent,
  ],
  entryComponents: [
    AdicionarEditoraModalComponent,
  ]
})
export class AdicionarEditoraModalModule {}
