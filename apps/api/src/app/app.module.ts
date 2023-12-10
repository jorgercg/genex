import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './modules/payments/payments.module';
import { GridEngineModule } from './modules/grid-engine/grid-engine.module';

@Module({
  imports: [GridEngineModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
