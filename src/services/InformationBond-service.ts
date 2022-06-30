import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpErrorResponse} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import{throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {retry} from "rxjs/operators";
import {InformationBond} from "../app/model/informationBond";

@Injectable({
  providedIn:'root'
})
export class InformationBondService {
  basePath = 'https://server-sergio.herokuapp.com/';
  //basePath = 'http://localhost:8105/api/v1/postulants';
  //basePath = 'https://easyjobsbackend.herokuapp.com/api/v1/postulants';
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
    return this.http.get<any>(`${this.basePath}getInformationBond/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getByUserId(id:number){
    return this.http.get<any>(`${this.basePath}/?userId=${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  editInformationBond(id:number,data:any){
    return this.http.put<InformationBond>(`${this.basePath}/${id}`,data,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  addInformationBond(data:any){
    return this.http.post<InformationBond>(`${this.basePath}`,data,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  deleteInformationBond(id:number){
    return this.http.delete<InformationBond>(`${this.basePath}/${id}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
