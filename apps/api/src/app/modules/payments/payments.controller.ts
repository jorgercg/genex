import { IPaymentsData } from '@genex/interfaces';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('data')
  getPaymentsData(): IPaymentsData {
    return this.paymentsService.getPaymentsData();
  }

  @Post('data')
  setPaymentsData(@Body() paymentsData: IPaymentsData): void {
    return this.paymentsService.setPaymentsData(paymentsData);
  }
}
