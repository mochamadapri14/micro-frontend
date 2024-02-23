import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeLandingPageComponent } from './employee-landing-page/employee-landing-page.component';
import { EmployeeFormPageComponent } from './employee-form-page/employee-form-page.component';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CompanyState } from '../../store/employee.state';

@NgModule({
  declarations: [
    EmployeeLandingPageComponent,
    EmployeeFormPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    BrowserAnimationsModule,
    // Material
    MatInputModule,
    MatCardModule,

    NgxsModule.forRoot([CompanyState])
  ],
  providers: [
    provideHttpClient()
  ]
})
export class EmployeeModule { }
