import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContratoGeneralService } from './contrato-general.service';
import { ContratoGeneral } from './entities/contrato-general.entity';
import { CrearContratoGeneralDto } from './dto/crear-contrato-general.dto';
import { ActualizarContratoGeneralDto } from './dto/actualizar-contrato-general.dto';

describe('ContratoGeneralService', () => {
  let service: ContratoGeneralService;
  let repository: Repository<ContratoGeneral>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContratoGeneralService,
        {
          provide: getRepositoryToken(ContratoGeneral),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ContratoGeneralService>(ContratoGeneralService);
    repository = module.get<Repository<ContratoGeneral>>(
      getRepositoryToken(ContratoGeneral),
    );
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debería devolver un array de contratos generales', async () => {
      const result = [{ id: 1 }, { id: 2 }];
      mockRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería devolver un contrato general por id', async () => {
      const result = { id: 1 };
      mockRepository.findOne.mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('create', () => {
    it('debería crear un nuevo contrato general', async () => {
      const dto: CrearContratoGeneralDto = {
        tipoCompromisoId: 1,
        tipoContratoId: 1,
        perfilContratistaId: 1,
        aplicaPoliza: true,
        modalidadSeleccionId: 1,
        tipologiaEspecificaId: 30,
        regimenContratacionId: 1,
        procedimientoId: 1,
        plazoEjecucion: 30,
        unidadEjecutoraId: 1,
        fechaSuscripcionEstudios: new Date(),
        ordenadorId: 1,
        numeroConstancia: 123,
        claseContratistaId: 1,
        tipoMonedaId: 1,
        valorPesos: 1000000,
        tipoGastoId: 1,
        origenRecursosId: 1,
        origenPresupuestosId: 1,
        temaGastoInversionId: 1,
        valorContratoMe: 1000,
        valorTasaCambio: 3800,
        medioPogoId: 1,
        clausulaRegistroPresupuestal: true,
        modoPago: 'Mensual',
        observaciones: 'Observaciones de prueba',
        vigencia: '2023',
        consecutivoElaboracion: '2023-001',
        fechaInicial: new Date(),
        fechaFinal: new Date(),
        usuarioLegacy: 'usuario_test',
      };
      const result = { id: 1, ...dto };
      mockRepository.save.mockResolvedValue(result);

      expect(await service.create(dto)).toBe(result);
      expect(mockRepository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('debería actualizar un contrato general', async () => {
      const id = 1;
      const dto: ActualizarContratoGeneralDto = {
        /* ... datos del DTO ... */
      };
      const updatedContrato = { id, ...dto };
      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOne.mockResolvedValue(updatedContrato);

      const result = await service.update(id, dto);

      expect(result).toEqual(updatedContrato);
      expect(mockRepository.update).toHaveBeenCalledWith(id, dto);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('remove', () => {
    it('debería marcar como inactivo un contrato general', async () => {
      const id = 1;
      const mockContrato = { id, activo: true };
      mockRepository.findOne.mockResolvedValue(mockContrato);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      await service.remove(id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(mockRepository.update).toHaveBeenCalledWith(id, {
        activo: false,
        fechaModificacion: expect.any(Date),
      });
    });

    it('debería lanzar un error si el contrato general no se encuentra', async () => {
      const id = 1;
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow(
        `ContratoGeneral con ID "${id}" no encontrado`,
      );
    });
  });
});
