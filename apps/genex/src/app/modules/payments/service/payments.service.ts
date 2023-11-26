import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IPaymentsData } from '@genex/interfaces';
import { environment } from '../../../../envs/environment';

@Injectable()
export class PaymentsService {
  private apiUrl: string;
  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.serverUrl + '/api/payments';
  }

  getPaymentsData(): Observable<IPaymentsData> {
    return this.http.get<IPaymentsData>(this.apiUrl + '/data');
  }

  setPaymentsData(paymentsData: IPaymentsData): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/data', paymentsData);
  }
}
