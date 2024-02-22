import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLandingPageComponent } from './employee-landing-page/employee-landing-page.component';
import { EmployeeFormPageComponent } from './employee-form-page/employee-form-page.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeLandingPageComponent
  },
  {
    path: 'form',
    component: EmployeeFormPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
