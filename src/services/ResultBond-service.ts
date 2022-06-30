import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpErrorResponse} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import{throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {retry} from "rxjs/operators";
import {ResultBond} from "../app/model/resultBond";

@Injectable({
  providedIn:'root'
})
export class ResultBondService {
  basePath = 'https://server-sergio.herokuapp.com/';
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

  getAll(){
    return this.http.get<any>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getById(id:number){
    // return this.http.get<any>(`${this.basePath}/?id=${id}`, this.httpOptions)api/v1/
    return this.http.get<any>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getByUserId(id:number){
    return this.http.get<any>(`${this.basePath}getResultBond/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  editResultBond(data:any){
    return this.http.patch<ResultBond>(`${this.basePath}editResultBond`,data,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  addResultBond(data:any){
    return this.http.post<ResultBond>(`${this.basePath}addResultBond`,data,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  deleteResultBond(id:number){
    return this.http.delete<ResultBond>(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
