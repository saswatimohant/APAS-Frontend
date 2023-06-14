import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const launchep = 'http://localhost:8080/process/launch';
const approvalep = 'http://localhost:8080/process/completetask';

@Injectable({
  providedIn: 'root'
})

export class ApprovalService {

  constructor(private http: HttpClient) { }
  procInfo: any = null;
  apprvInfo: any = null;

  getProcessInfo() {
    return this.procInfo;
  }

  launchApprovalFlow(body: any): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    console.log("Inside launchApprovalFlow Service: " + JSON.stringify(body));
    this.http.post(launchep, JSON.stringify(body), 
      {'headers':headers,withCredentials:true}).subscribe(data => {
        this.procInfo = data;
        console.log("Process Info: " + JSON.stringify(this.procInfo))
    });
    
    console.log("Inside launchApprovalFlow called: " + JSON.stringify(this.procInfo));
    return this.procInfo;
  }

  approveInvoice(body: any): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    console.log("Inside approveInvoice Service: " + JSON.stringify(body));
    this.http.post(approvalep, JSON.stringify(body), 
      {'headers':headers,withCredentials:true}).subscribe(data => {
        this.apprvInfo = data;
    });
    
    console.log("Inside approveInvoice called: " + JSON.stringify(this.apprvInfo));
    return this.apprvInfo;
  }

  rejectInvoice(body: any): Observable<any> {
    console.log("Inside rejectInvoice Service: " + JSON.stringify(body));
    return this.http.post(approvalep, JSON.stringify(body)).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    console.log("Error Occured .......");
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
