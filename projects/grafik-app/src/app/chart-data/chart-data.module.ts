import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartDataRoutingModule } from './chart-data-routing.module';
import { ChartDataComponent } from './chart-data.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ChartDataComponent],
  imports: [
    CommonModule,
    ChartDataRoutingModule
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: ChartDataComponent
    //   }
    // ])
  ],
  // exports: [RouterModule]
})
export class ChartDataModule { }
