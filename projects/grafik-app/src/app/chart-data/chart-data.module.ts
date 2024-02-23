import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartDataRoutingModule } from './chart-data-routing.module';
import { ChartDataComponent } from './chart-data.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [ChartDataComponent],
  imports: [
    CommonModule,
    ChartDataRoutingModule,
    ChartModule
  ],
})
export class ChartDataModule { }
