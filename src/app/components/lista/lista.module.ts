import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListaComponent } from 'src/app/components/lista/lista.component';
import { PopoverMenuComponentModule } from 'src/app/components/menu-popover/popover-menu.component.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PopoverMenuComponentModule
  ],
  declarations: [ListaComponent],
  exports: [ListaComponent]
})
export class ListaComponentModule {}
