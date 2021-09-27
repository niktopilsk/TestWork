import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Invoice } from '../models/invoice';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  invoice = new BehaviorSubject<Invoice[]>([]);
  private readonly url = 'http://localhost:5000/api/ivoices';

  constructor(private http: HttpClient) {
  }

  private static handleError(error: HttpErrorResponse) {
    return throwError(error.message ?? error.name);
  }

  getAll(): void {
    this.http.get<Invoice[]>(this.url + `/getall`)
      .subscribe(_ =>
        this.invoice.next(_)
      );
  }

  get(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(this.url + `/get?id=${ id }`)
      .pipe(catchError(_ => DataSourceService.handleError(_)));
  }

  add(invoice: Invoice): Observable<any> {
    return this.http.post(this.url + `/add`, invoice)
      .pipe(catchError(_ => DataSourceService.handleError(_)));
  }

  remove(id: string): Observable<any> {
    return this.http.delete(this.url + `/delete?id=${ id }`)
      .pipe(catchError(_ => DataSourceService.handleError(_)));
  }

  update(invoice: Invoice): Observable<any> {
    return this.http.patch(this.url + `/update`, invoice)
      .pipe(catchError(_ => DataSourceService.handleError(_)));
  }
}
