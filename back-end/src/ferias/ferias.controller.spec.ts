import { Test, TestingModule } from '@nestjs/testing';
import { FeriasController } from './ferias.controller';

describe('FeriasController', () => {
  let controller: FeriasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeriasController],
    }).compile();

    controller = module.get<FeriasController>(FeriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
