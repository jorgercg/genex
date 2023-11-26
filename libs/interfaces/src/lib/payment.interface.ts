import { IGridData } from "./grid-data.interface";

export interface IPayment {
  paymentName: string;
  paymentAmount: string;
  gridData: IGridData;
}
