import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RestService {

    constructor(private _http: HttpClient) { }

    public get(query: string): Observable<any> {
        return this._http.get(query);
    }

    public manage(
        method: string,
        query: string,
        body?: any): Observable<any> {
        switch (method) {
            case 'post':
                return this._http.post(query, body);
            case 'put':
                return this._http.put(query, body);
            case 'delete':
                console.log(query);
                return this._http.delete(query);
            default:
                return this.get(query);
        }
    }
}