import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContratoGeneralService } from './contrato-general.service';
import { ContratoGeneral } from './entities/contrato-general.entity';
import { CrearContratoGeneralDto } from './dto/crear-contrato-general.dto';
import { ActualizarContratoGeneralDto } from './dto/actualizar-contrato-general.dto';
import { HttpStatus } from '@nestjs/common';

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
    it('debería devolver todos los contratos generales', async () => {
      const result = [{ id: 1 }, { id: 2 }];
      mockRepository.find.mockResolvedValue(result);

      const response = await service.findAll();
      expect(response).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contratos generales encontrados',
        Data: result,
      });
    });

    it('debería manejar el caso de no encontrar contratos', async () => {
      mockRepository.find.mockResolvedValue(null);

      const response = await service.findAll();
      expect(response).toEqual({
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Contratos generales no encontrados',
        Data: null,
      });
    });
  });

  describe('findOne', () => {
    it('debería devolver un contrato general por id', async () => {
      const result = { id: 1 };
      mockRepository.findOne.mockResolvedValue(result);

      const response = await service.findOne(1);
      expect(response).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contrato general encontrado',
        Data: result,
      });
    });

    it('debería manejar el caso de no encontrar el contrato', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const response = await service.findOne(1);
      expect(response).toEqual({
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Contrato general no encontrado',
        Data: null,
      });
    });
  });

  describe('create', () => {
    it('debería crear un nuevo contrato general', async () => {
      const contratoDto: CrearContratoGeneralDto = {
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
      const result = { id: 1, ...contratoDto };
      mockRepository.save.mockResolvedValue(result);

      const response = await service.create(contratoDto);
      expect(response).toEqual({
        Success: true,
        Status: HttpStatus.CREATED,
        Message: 'Contrato general creado',
        Data: result,
      });
    });

    it('debería manejar errores al crear', async () => {
      mockRepository.save.mockRejectedValue(new Error('Error de prueba'));

      const response = await service.create({} as CrearContratoGeneralDto);
      expect(response).toEqual({
        Success: false,
        Status: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: 'Error al crear el contrato general',
        Data: expect.any(Error),
      });
    });
  });

  describe('update', () => {
    it('debería actualizar un contrato general', async () => {
      const dto: ActualizarContratoGeneralDto = {
        /* ... datos del DTO ... */
      };
      const updatedContrato = { id: 1, ...dto };
      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOne.mockResolvedValue(updatedContrato);

      const response = await service.update(1, dto);
      expect(response).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contrato general actualizado',
        Data: expect.objectContaining({
          Success: true,
          Status: HttpStatus.OK,
          Data: updatedContrato,
        }),
      });
    });

    it('debería manejar errores al actualizar', async () => {
      mockRepository.update.mockRejectedValue(new Error('Error de prueba'));

      const response = await service.update(
        1,
        {} as ActualizarContratoGeneralDto,
      );
      expect(response).toEqual({
        Success: false,
        Status: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: 'Error al actualizar el contrato general',
        Data: expect.any(Error),
      });
    });
  });

  describe('remove', () => {
    it('debería marcar como inactivo un contrato general', async () => {
      const mockContrato = { id: 1, activo: true };
      mockRepository.findOne.mockResolvedValue(mockContrato);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const response = await service.remove(1);
      expect(response).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contrato general eliminado',
        Data: null,
      });
      expect(mockRepository.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          activo: false,
          fechaModificacion: expect.any(Date),
        }),
      );
    });

    it('debería manejar el caso de no encontrar el contrato a eliminar', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const response = await service.remove(1);
      expect(response).toEqual({
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Contrato general no encontrado',
        Data: null,
      });
    });

    it('debería manejar errores al eliminar', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 1 });
      mockRepository.update.mockRejectedValue(new Error('Error de prueba'));

      const response = await service.remove(1);
      expect(response).toEqual({
        Success: false,
        Status: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: 'Error al eliminar el contrato general',
        Data: expect.any(Error),
      });
    });
  });
});
