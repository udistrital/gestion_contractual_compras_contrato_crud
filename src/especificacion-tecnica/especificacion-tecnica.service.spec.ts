import { Test, TestingModule } from '@nestjs/testing';
import { EspecificacionTecnicaService } from './especificacion-tecnica.service';

describe('EspecificacionTecnicaService', () => {
  let service: EspecificacionTecnicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EspecificacionTecnicaService],
    }).compile();

    service = module.get<EspecificacionTecnicaService>(EspecificacionTecnicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
