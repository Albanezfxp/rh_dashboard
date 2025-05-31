import { Test, TestingModule } from '@nestjs/testing';
import { FeriasService } from './ferias.service';

describe('FeriasService', () => {
  let service: FeriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeriasService],
    }).compile();

    service = module.get<FeriasService>(FeriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
