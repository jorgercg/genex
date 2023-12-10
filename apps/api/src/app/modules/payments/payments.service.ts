import { IPaymentsData } from '@genex/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  private paymentsData: IPaymentsData = {
    payments: [],
  };

  public getPaymentsData(): IPaymentsData {
    return this.paymentsData;
  }

  public setPaymentsData(paymentsData: IPaymentsData): void {
    this.paymentsData = paymentsData;
  }
}
