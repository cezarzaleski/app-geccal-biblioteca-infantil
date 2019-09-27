import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuComponentModule {}
