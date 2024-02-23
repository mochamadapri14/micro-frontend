import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HOST_APP_URL } from '../../../core/data/api';
import { EmployeeService } from '../../../core/services/employee.service';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { CompanyState } from '../../../store/employee.state';
import { AddEmployee, GetEmployee, UpdateEmployee } from '../../../store/employee.actions';

@Component({
  selector: 'employee-form-page',
  templateUrl: './employee-form-page.component.html',
  styleUrl: './employee-form-page.component.scss'
})
export class EmployeeFormPageComponent implements OnInit, OnDestroy {

  protected formGroup!: FormGroup;
  protected userId: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private store: Store
  ) {
    this.createObject();
    this.paramConsumer();
  }

  @Select(CompanyState.insertEmployeeSelector) postObs$!: Observable<any>;
  @Select(CompanyState.updateEmployeeSelector) updateObs$!: Observable<any>;

  ngOnInit(): void {

    if (this.userId != -1) {
      this.onLoadReference();
    }
  }

  protected onAction(action: string): void {
    const onSubmit: boolean = action === 'submit';
    if (onSubmit) {
      const body = this.formGroupToObject();
      if (body) this.manageEmployee(body);
    } else {
      this.navigateToLandingPage();
    }
  }

  private paramConsumer(): void {
    this.route.params.subscribe(param => {
      this.userId = param['id'] ?? -1;
    });
  }

  private createObject(): void {
    this.formGroup = this.formBuilder.group({
      employeeName: ['', [Validators.required]],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeeAddress: this.formBuilder.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]]
      }),
      employeePhone: ['', [Validators.required]]
    });
  }

  private navigateToLandingPage(): void {
    document.location.href = `${HOST_APP_URL}/employee`;
  }

  private manageEmployee(body: any): void {
    const isEdit = this.userId != -1;

    if (!isEdit) {

      this.store.dispatch(new AddEmployee(body));
      this.postObs$.subscribe(_ => this.navigateToLandingPage());
    } else {
      body = { ...body, id: this.userId };

      this.store.dispatch(new UpdateEmployee(body));
      this.updateObs$.subscribe(_ => this.navigateToLandingPage());
    }
  }

  private formGroupToObject(): any {
    const formGroup = this.formGroup.value;

    let object = {
      name: formGroup.employeeName,
      email: formGroup.employeeEmail,
      phone: formGroup.employeePhone,
      address: formGroup.employeeAddress
    };
    return this.userId == -1 ? object : { ...object, id: this.userId };
  }

  private referenceAssignment(dataRef: any): void {
    const { name, email, phone, address } = dataRef;
    this.formGroup.controls['employeeName'].setValue(name);
    this.formGroup.controls['employeeEmail'].setValue(email);
    this.formGroup.controls['employeePhone'].setValue(phone);
    this.formGroup.controls['employeeAddress'].get('city')?.setValue(address.city);
    this.formGroup.controls['employeeAddress'].get('street')?.setValue(address.street);
  }

  private dataReference = null;
  private onLoadReference(): void {
    this.employeeService.getEmployeeDetail(this.userId).subscribe({
      next: (response) => {
        this.dataReference = response;
      },
      error: (err) => { },
      complete: () => {
        this.referenceAssignment(this.dataReference);
      }
    });
  }

  // get employeeName(): FormControl<string> {
  //   return this.formGroup.get('employeeName') ?? '';
  // }

  ngOnDestroy(): void {
    this.userId = -1;
  }

}
