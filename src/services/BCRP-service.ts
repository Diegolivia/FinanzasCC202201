import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpErrorResponse} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {retry} from "rxjs/operators";
@Injectable({
  providedIn:'root'
})
export class BCRPService {
  basePath='/estadisticas/series/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) {
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError('Something happened with request, please try again later');
  }
  getChanges(dateI:string,dateF:string){
    return this.http.get<any>(`${this.basePath}/PN01205PM/json/${dateI}/${dateF}/esp`, this.httpOptions)
      .pipe(
        retry(5),
        catchError(this.handleError));
  }
  getChangesDollarPen(dateI:string,dateF:string){
    return this.http.get<any>(`${this.basePath}/PD04646PD/json/${dateI}/${dateF}/esp`, this.httpOptions)
      .pipe(
        retry(5),
        catchError(this.handleError));
  }
  getChangesEUROPen(dateI:string,dateF:string){
    return this.http.get<any>(`${this.basePath}/PD04647PD/json/${dateI}/${dateF}/esp`, this.httpOptions)
      .pipe(
        retry(5),
        catchError(this.handleError));
  }
  getChangesEuroDollar(dateI:string,dateF:string){
    return this.http.get<any>(`${this.basePath}/PD04700XD/json/${dateI}/${dateF}/esp`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getYuan(dateI:string,dateF:string){
    return this.http.get<any>(`${this.basePath}/PN01240PM/json/${dateI}/${dateF}/esp`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getYen(dateI:string,dateF:string){
    return this.http.get<any>(`${this.basePath}/PN01236PM/json/${dateI}/${dateF}/esp`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getLib(dateI:string,dateF:string){
    return this.http.get<any>(`${this.basePath}/PN01238PM/json/${dateI}/${dateF}/esp`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getFra(dateI:string,dateF:string){
    return this.http.get<any>(`${this.basePath}/PN01243PM/json/${dateI}/${dateF}/esp`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getReal(dateI:string,dateF:string){
    return this.http.get<any>(`${this.basePath}/PN01237PM/json/${dateI}/${dateF}/esp`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getPeso(dateI:string,dateF:string){
    return this.http.get<any>(`${this.basePath}/PN01242PM/json/${dateI}/${dateF}/esp`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
