import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { RestService } from "./rest.service";
import { API } from "../data/api";
import { Method } from "../data/enum";

@Injectable({ providedIn: 'root' })
export class EmployeeService {

    constructor(private _restService: RestService) { }

    public getAllEmployee(): Observable<any[]> {
        const query = `${API}/users`;
        return this._restService.get(query);
    }

    public getEmployeeDetail(id: number): Observable<any> {
        const query = `${API}/users/${id}`;
        return this._restService.get(query);
    }

    public insertEmployee(body: any): Observable<any> {
        const query = `${API}/users`
        return this._restService.manage(Method.POST, query, body);
    }

    public updateEmployee(body: any): Observable<any> {
        const _id = body.id ?? null;
        const query = `${API}/users/${_id}`;
        return this._restService.manage(Method.PUT, query, body);
    }

    public deleteEmployee(id: number): Observable<any> {
        const query = `${API}/users/${id}`;
        return this._restService.manage(Method.DELETE, query);
    }
}