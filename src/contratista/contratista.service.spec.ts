import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContratistaService } from './contratista.service';
import { Contratista } from './entities/contratista.entity';
import { CreateContratistaDto } from './dto/create-contratista.dto';
import { UpdateContratistaDto } from './dto/update-contratista.dto';
import { NotFoundException } from '@nestjs/common';

describe('ContratistaService', () => {
  let service: ContratistaService;
  let repository: Repository<Contratista>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContratistaService,
        {
          provide: getRepositoryToken(Contratista),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ContratistaService>(ContratistaService);
    repository = module.get<Repository<Contratista>>(
      getRepositoryToken(Contratista),
    );
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un nuevo contratista', async () => {
      const createDto: CreateContratistaDto = {
        activo: false,
        tipo_persona_id: 0,
        numero_documento: '1234',
      };
      const createdContratista = { id: '1', ...createDto };

      mockRepository.create.mockReturnValue(createdContratista);
      mockRepository.save.mockResolvedValue(createdContratista);

      const result = await service.create(createDto);

      expect(result).toEqual(createdContratista);
      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createdContratista);
    });
  });

  describe('findAll', () => {
    it('debería devolver un array de contratistas', async () => {
      const contratistas = [{ id: '1', name: 'Contratista de Prueba' }];
      mockRepository.find.mockResolvedValue(contratistas);

      const result = await service.findAll();

      expect(result).toEqual(contratistas);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería devolver un contratista por id', async () => {
      const contratista = { id: '1', name: 'Contratista de Prueba' };
      mockRepository.findOne.mockResolvedValue(contratista);

      const result = await service.findOne('1');

      expect(result).toEqual(contratista);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('debería lanzar NotFoundException si no se encuentra el contratista', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debería actualizar un contratista', async () => {
      const updateDto: UpdateContratistaDto = {
        tipo_persona_id: 3,
      };
      const existingContratista = { id: '1', name: 'Contratista de Prueba' };
      const updatedContratista = { ...existingContratista, ...updateDto };

      mockRepository.findOne.mockResolvedValue(existingContratista);
      mockRepository.save.mockResolvedValue(updatedContratista);

      const result = await service.update('1', updateDto);

      expect(result).toEqual(updatedContratista);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockRepository.save).toHaveBeenCalledWith(updatedContratista);
    });

    it('debería lanzar NotFoundException si no se encuentra el contratista a actualizar', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debería eliminar un contratista', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });

    it('debería lanzar NotFoundException si no se encuentra el contratista a eliminar', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByContratoGeneralId', () => {
    it('debería devolver un contratista por el id del contrato general', async () => {
      const contratista = {
        id: '1',
        name: 'Contratista de Prueba',
        contrato_general: { id: 1 },
      };
      mockRepository.findOne.mockResolvedValue(contratista);

      const result = await service.findByContratoGeneralId(1);

      expect(result).toEqual(contratista);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { contrato_general: { id: 1 } },
      });
    });

    it('debería lanzar NotFoundException si no se encuentra el contratista para el id del contrato general', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findByContratoGeneralId(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
