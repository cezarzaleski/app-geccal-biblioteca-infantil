import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FiltrosComponent } from 'src/app/components/filtros/filtros.component';
import { SelecaoComBuscaModalModule } from 'src/app/modals/selecao-com-busca-modal/selecao-com-busca-modal.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SelecaoComBuscaModalModule,
    MaterialModule,
    PipesModule
  ],
    declarations: [FiltrosComponent],
    exports: [FiltrosComponent]
})
export class FiltrosComponentModule { }
