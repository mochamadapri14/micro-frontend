import { Component, NgModule, NgModuleRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, createNgModuleRef } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee.service';
import { RestService } from '../../../core/services/rest.service';
import { TableHeader } from '../../../core/data/interface';
import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { TitleCasePipe } from '@angular/common';
import { COMPONENT_APP_URL, HOST_APP_URL } from '../../../core/data/api';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { CompanyState } from '../../../store/employee.state';
import { Observable } from 'rxjs';
import { GetEmployee } from '../../../store/employee.actions';

const PROVIDERS = [RestService, EmployeeService, TitleCasePipe];
@Component({
  selector: 'employee-landing-page',
  templateUrl: './employee-landing-page.component.html',
  styleUrl: './employee-landing-page.component.scss',
  providers: PROVIDERS
})
export class EmployeeLandingPageComponent implements OnInit, OnDestroy {

  protected headers: any[] = [];
  protected collections: any[] = [];
  protected currentPage = 1;

  constructor(
    private employeeService: EmployeeService,
    private titleCasePipe: TitleCasePipe,
    private router: Router,
    private store: Store
  ) { }

  @Select(CompanyState.getEmployeeSelector) employeeObs$!: Observable<any>;
  ngOnInit() {

    this.onLoadEmployee(this.currentPage);
  }

  @ViewChild('dataset', { read: ViewContainerRef }) viewContainer!: ViewContainerRef;

  async loadRemote(): Promise<void> {

    const m = await loadRemoteModule({
      remoteName: 'componentApp',
      remoteEntry: COMPONENT_APP_URL,
      exposedModule: './CustomTableComponent'
    });
    let componentRef: any = this.viewContainer.createComponent(m.CustomTableComponent);

    componentRef.setInput('headers', this.headers);
    componentRef.setInput('collections', this.collections);

    componentRef.instance.onSelected.subscribe((event: any) => {
      const { action, collector } = event;
      if (action === 'edit') {
        this.navigateToForm(collector.id);
      } else {
        this.employeeService.deleteEmployee(collector.id);
      }
    });
  }

  private onLoadEmployee(page: number): void {

    this.store.dispatch(new GetEmployee());
    this.employeeObs$
      .subscribe(
        (response: any[]) => {
          if (response) {
            response = response.map((value: any) => {
              value.address = `${value.address.city}, ${value.address.street}`;
              return value;
            });
            const collectionKeys: string[] = response.length > 0
              ? Object.keys(response[0])
                .filter((p: string) => p !== 'id' && p !== 'website' && p !== 'company') : [];

            this.headers = collectionKeys.map((value: string) => {
              return { column: value, label: this.titleCasePipe.transform(value) }
            });

            this.collections = response;
            // this.collections = [...this.collections, ...response];
            if (this.collections.length > 0) {
              this.loadRemote();
            }
          }

        });
  }

  protected navigateToForm(id: number): void {
    const endpoint = id != -1 ? `employee/form/${id}` : `employee/form`;
    document.location.href = `${HOST_APP_URL}/${endpoint}`;
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
    this.collections = [];
    this.headers = [];
  }
}
