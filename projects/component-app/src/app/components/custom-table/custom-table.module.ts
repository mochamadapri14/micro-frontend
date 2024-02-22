import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../component.module';
import { CustomTableComponent } from './custom-table.component';

@NgModule({
  exports: [CustomTableComponent],
  declarations: [CustomTableComponent],
  imports: [
    CommonModule,
    ComponentModule,
  ]
})
export class CustomTableModule { }
