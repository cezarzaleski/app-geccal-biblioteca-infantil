import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SelecaoComBuscaModalComponent } from 'src/app/modals/selecao-com-busca-modal/selecao-com-busca-modal.component';
import { RepeatDirectiveModule } from 'src/app/directives/repeat/repeat.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RepeatDirectiveModule
  ],
  declarations: [
    SelecaoComBuscaModalComponent,
  ],
  entryComponents: [
    SelecaoComBuscaModalComponent,
  ]
})
export class SelecaoComBuscaModalModule {}
