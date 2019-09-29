import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MomentPipe } from './moment.pipe';
import { RgPipe } from 'src/app/pipes/rg.pipe';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { CepPipe } from 'src/app/pipes/cep.pipe';

const pipes = [
  MomentPipe,
  RgPipe,
  CpfPipe,
  CepPipe,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: pipes,
  exports: pipes
})
export class PipesModule {}
