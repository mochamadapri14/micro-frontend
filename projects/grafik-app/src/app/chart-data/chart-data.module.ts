import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartDataRoutingModule } from './chart-data-routing.module';
import { ChartDataComponent } from './chart-data.component';

@NgModule({
  declarations: [ChartDataComponent],
  imports: [
    CommonModule,
    ChartDataRoutingModule
  ],
})
export class ChartDataModule { }
