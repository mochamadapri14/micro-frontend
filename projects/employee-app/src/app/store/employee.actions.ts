import { Employee } from "../model/employee.model";

export class GetEmployee {
  static readonly type = '[Company] Get Employee';
}

export class AddEmployee {
  static readonly type = '[Company] Add Employee';
  constructor(public payload: Employee) { }
}

export class UpdateEmployee {
  static readonly type = '[Company] Update Employee';
  constructor(public payload: Employee) { }
}

export class DeleteEmployee {
  static readonly type = '[Company] Delete Employee';
  constructor(public payload: Employee) { }
}