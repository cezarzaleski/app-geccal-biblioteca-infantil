import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RepeatDirectiveModule } from 'src/app/directives/repeat/repeat.module';
import { AdicionarCampoUnicoModalComponent } from 'src/app/modals/adicionar-campo-unico-modal/adicionar-campo-unico-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RepeatDirectiveModule
  ],
  declarations: [
    AdicionarCampoUnicoModalComponent,
  ],
  entryComponents: [
    AdicionarCampoUnicoModalComponent,
  ]
})
export class AdicionarCampoUnicoModalModule {}
