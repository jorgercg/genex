import { Test, TestingModule } from '@nestjs/testing';
import { GridEngineGateway } from './grid-engine.gateway';


describe('GridEngineGateway', () => {
  let gateway: GridEngineGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GridEngineGateway],
    }).compile();

    gateway = module.get<GridEngineGateway>(GridEngineGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});