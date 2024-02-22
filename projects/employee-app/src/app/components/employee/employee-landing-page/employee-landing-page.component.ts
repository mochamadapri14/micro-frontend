import { Component, NgModule, NgModuleRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, createNgModuleRef } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee.service';
import { RestService } from '../../../core/services/rest.service';
import { TableHeader } from '../../../core/data/interface';
import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { TitleCasePipe } from '@angular/common';
import { COMPONENT_APP_URL } from '../../../core/data/api';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

const PROVIDERS = [RestService, EmployeeService, TitleCasePipe];
@Component({
  selector: 'employee-landing-page',
  templateUrl: './employee-landing-page.component.html',
  styleUrl: './employee-landing-page.component.scss',
  providers: PROVIDERS
})
export class EmployeeLandingPageComponent implements OnInit, OnDestroy {

  headers: any[] = [];
  collections: any[] = [];
  currentPage = 1;

  constructor(
    private employeeService: EmployeeService,
    private titleCasePipe: TitleCasePipe,
    private router: Router
  ) { }


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
        this.router.navigate(['/employee/form/' + collector.id]);
      } else {
        this.employeeService.deleteEmployee(collector.id);
      }
    });
  }

  private onLoadEmployee(page: number): void {
    this.employeeService.getAllEmployee()
      .subscribe({
        next: (response: any[]) => {
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
          }
        },
        error: (err) => {
        },
        complete: () => {
          this.loadRemote();
        }
      });
  }

  ngOnInit() {
    this.onLoadEmployee(this.currentPage);
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
    this.collections = [];
    this.headers = [];
  }
}
