import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdicionarAutorModalComponent } from 'src/app/modals/adicionar-autor-modal/adicionar-autor-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [
    AdicionarAutorModalComponent,
  ],
  entryComponents: [
    AdicionarAutorModalComponent,
  ]
})
export class AdicionarAutorModalModule {}
