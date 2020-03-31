import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class BgEvService {
    data: any=[]
    url = 'assets/api/users.json';
    private dataSource = new BehaviorSubject([]);
    currentData = this.dataSource.asObservable();
    constructor(private http: HttpClient) {
        
    }

    getUserDetails(): Observable<any[]> {
        return this.http.get<any[]>(this.url).pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    changeData(data: any) {
    this.dataSource.next(data);
  }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent){
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

}