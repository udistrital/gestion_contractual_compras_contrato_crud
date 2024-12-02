import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ContratoGeneralService } from './contrato-general.service';
import { ContratoGeneral } from './entities/contrato-general.entity';
import { CrearContratoGeneralDto } from './dto/crear-contrato-general.dto';
import { ActualizarContratoGeneralDto } from './dto/actualizar-contrato-general.dto';
import { NotFoundException } from '@nestjs/common';
import { BaseQueryParamsDto } from '../shared/dto/query-params.base.dto';

describe('ContratoGeneralService', () => {
  let service: ContratoGeneralService;
  let repository: Repository<ContratoGeneral>;
  let queryBuilder: SelectQueryBuilder<ContratoGeneral>;

  const mockQueryBuilder = {
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
    getMany: jest.fn(),
    getManyAndCount: jest.fn(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
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
    queryBuilder =
      repository.createQueryBuilder() as SelectQueryBuilder<ContratoGeneral>;
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debería devolver un array de contratos generales con metadata', async () => {
      const queryParams: BaseQueryParamsDto = {};
      const mockContratos = [{ id: 1 }, { id: 2 }];
      const mockCount = 2;

      mockQueryBuilder.getManyAndCount.mockResolvedValue([
        mockContratos,
        mockCount,
      ]);

      const [result, metadata] = await service.findAll(queryParams);

      expect(result).toEqual(mockContratos);
      expect(metadata).toEqual({
        totalItems: mockCount,
        itemCount: mockContratos.length,
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        limit: 10,
        offset: 0,
        total: mockCount,
        totalPages: 1,
      });
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('contrato');
    });
  });

  describe('findOne', () => {
    it('debería devolver un contrato general por id', async () => {
      const id = 1;
      const mockContrato = { id: 1 };
      mockQueryBuilder.getOne.mockResolvedValue(mockContrato);

      const result = await service.findOne(id);

      expect(result).toEqual(mockContrato);
      expect(queryBuilder.where).toHaveBeenCalledWith('contrato.id = :id', {
        id,
      });
    });

    it('debería lanzar NotFoundException cuando el contrato no existe', async () => {
      const id = 999;
      mockQueryBuilder.getOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
      expect(queryBuilder.where).toHaveBeenCalledWith('contrato.id = :id', {
        id,
      });
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
        usuarioLegado: 'usuario_test',
      };

      const mockCreatedContrato = { id: 1, ...dto, activo: true };
      mockRepository.create.mockReturnValue(mockCreatedContrato);
      mockRepository.save.mockResolvedValue(mockCreatedContrato);

      const result = await service.create(dto);

      expect(result).toEqual(mockCreatedContrato);
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...dto,
        activo: true,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockCreatedContrato);
    });
  });

  describe('update', () => {
    it('debería actualizar un contrato general', async () => {
      const id = 1;
      const dto: ActualizarContratoGeneralDto = {
        observaciones: 'Observaciones actualizadas',
      };

      const mockExistingContrato = { id, ...dto };
      mockQueryBuilder.getOne
        .mockResolvedValueOnce(mockExistingContrato)
        .mockResolvedValueOnce({
          ...mockExistingContrato,
          fechaModificacion: expect.any(Date),
        });

      const result = await service.update(id, dto);

      expect(result).toEqual({
        ...mockExistingContrato,
        fechaModificacion: expect.any(Date),
      });
      expect(mockRepository.update).toHaveBeenCalledWith(id, {
        ...dto,
        fechaModificacion: expect.any(Date),
      });
    });

    it('debería lanzar error cuando el contrato a actualizar no existe', async () => {
      const id = 999;
      mockQueryBuilder.getOne.mockResolvedValue(null);

      await expect(service.update(id, {})).rejects.toThrow(
        'Error al actualizar el contrato general: ContratoGeneral con ID "999" no encontrado',
      );
    });
  });

  describe('remove', () => {
    it('debería marcar como inactivo un contrato general', async () => {
      const id = 1;
      const mockContrato = { id, activo: true };
      mockQueryBuilder.getOne.mockResolvedValue(mockContrato);

      await service.remove(id);

      expect(mockRepository.update).toHaveBeenCalledWith(id, {
        activo: false,
        fechaModificacion: expect.any(Date),
      });
    });

    it('debería lanzar error cuando el contrato a eliminar no existe', async () => {
      const id = 999;
      mockQueryBuilder.getOne.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow(
        'Error al eliminar el contrato general: ContratoGeneral con ID "999" no encontrado',
      );
    });
  });
});
