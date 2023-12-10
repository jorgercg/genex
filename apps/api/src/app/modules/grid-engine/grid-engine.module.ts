import { Module } from '@nestjs/common';
import { GridEngineGateway } from './grid-engine.gateway';

@Module({
  providers: [GridEngineGateway],
})
export class GridEngineModule {}
