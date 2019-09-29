import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
} from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

@NgModule({
  exports: [
    MatTableModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SatDatepickerModule,
    SatNativeDateModule,
  ],
  providers: [
    MatDatepickerModule,
  ],
})
export class MaterialModule {}
