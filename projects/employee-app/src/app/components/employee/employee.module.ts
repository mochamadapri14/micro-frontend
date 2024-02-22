import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeLandingPageComponent } from './employee-landing-page/employee-landing-page.component';
import { EmployeeFormPageComponent } from './employee-form-page/employee-form-page.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    EmployeeLandingPageComponent,
    EmployeeFormPageComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ],
  providers: [
    provideHttpClient()
  ]
})
export class EmployeeModule { }
