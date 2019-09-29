import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from 'core/components/filtros/filtros.component';
import { IonicModule } from '@ionic/angular';
import { SelecaoComBuscaModalModule } from 'core/modals/selecao-com-busca-modal/selecao-com-busca-modal.module';
import { MaterialModule } from 'app/material.module';
import { PipesModule } from 'core/pipes/pipes.module';

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
