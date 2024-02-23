import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Employee } from '../model/employee.model';
import { Injectable } from '@angular/core';
import { AddEmployee, GetEmployee, UpdateEmployee } from './employee.actions';
import { EmployeeService } from '../core/services/employee.service';
import { tap } from 'rxjs';

export interface CompanyStateModel {
    GetEmployee: Employee[],
    AddEmployee: any,
    UpdateEmployee: any
}
@State<CompanyStateModel>({
    name: 'Company',
    defaults: {
        GetEmployee: [],
        AddEmployee: {},
        UpdateEmployee: {}
    }
})

@Injectable()
export class CompanyState {

    constructor(
        private employeeService: EmployeeService) {
    }

    @Selector()
    static getEmployeeSelector(state: CompanyStateModel) {
        return state.GetEmployee;
    }

    @Action(GetEmployee)
    getEmployeeAction(context: StateContext<CompanyStateModel>) {
        return this.employeeService.getAllEmployee().pipe(tap(res => {
            const state = context.getState();
            context.setState({
                ...state,
                GetEmployee: res
            });
        }));

    }

    @Selector()
    static insertEmployeeSelector(state: CompanyStateModel) {
        return state.AddEmployee;
    }

    @Action(AddEmployee)
    insertEmployeAction(context: StateContext<CompanyStateModel>, { payload }: any) {

        return this.employeeService.insertEmployee(payload).pipe(tap(res => {
            const state = context.getState();
            context.setState({
                ...state,
                AddEmployee: res
            });
        }));
    }

    @Selector()
    static updateEmployeeSelector(state: CompanyStateModel) {
        return state.UpdateEmployee;
    }

    @Action(UpdateEmployee)
    updateEmployeAction(context: StateContext<CompanyStateModel>, { payload }: any) {
        return this.employeeService.updateEmployee(payload).pipe(tap(res => {
            const state = context.getState();
            context.setState({
                ...state,
                UpdateEmployee: res
            });
        }));
    }
}