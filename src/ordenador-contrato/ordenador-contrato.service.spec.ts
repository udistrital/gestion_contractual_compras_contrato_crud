import { Test, TestingModule } from '@nestjs/testing';
import { OrdenadorContratoService } from './ordenador-contrato.service';

describe('OrdenadorContratoService', () => {
  let service: OrdenadorContratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenadorContratoService],
    }).compile();

    service = module.get<OrdenadorContratoService>(OrdenadorContratoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
