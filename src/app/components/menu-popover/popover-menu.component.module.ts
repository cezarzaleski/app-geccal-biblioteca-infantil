import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PopoverMenuComponent } from 'src/app/components/menu-popover/popover-menu.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [PopoverMenuComponent],
  exports: [PopoverMenuComponent],
  entryComponents: [PopoverMenuComponent]
})
export class PopoverMenuComponentModule {}
