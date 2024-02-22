import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeLandingPageComponent } from './employee-landing-page/employee-landing-page.component';
import { EmployeeFormPageComponent } from './employee-form-page/employee-form-page.component';

@NgModule({
  declarations: [
    EmployeeLandingPageComponent,
    EmployeeFormPageComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
