import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EspecificacionTecnicaService } from './especificacion-tecnica.service';
import { EspecificacionTecnica } from './entities/especificacion-tecnica.entity';
import { CrearEspecificacionTecnicaDto } from './dto/crear-especificacion-tecnica.dto';
import { ActualizarEspecificacionTecnicaDto } from './dto/actualizar-especificacion-tecnica';


describe('EspecificacionTecnicaService', () => {
  let service: EspecificacionTecnicaService;
  let repository: Repository<EspecificacionTecnica>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EspecificacionTecnicaService,
        {
          provide: getRepositoryToken(EspecificacionTecnica),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EspecificacionTecnicaService>(EspecificacionTecnicaService);
    repository = module.get<Repository<EspecificacionTecnica>>(
      getRepositoryToken(EspecificacionTecnica),
    );
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debería devolver un array de especificaciones técnicas', async () => {
      const result = [{ id: 1 }, { id: 2 }];
      mockRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería devolver una especificación técnica por id', async () => {
      const result = { id: 1 };
      mockRepository.findOne.mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('debería lanzar un error si la especificación técnica no se encuentra', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        'EspecificacionTecnica con ID "1" no encontrada',
      );
    });
  });

  describe('create', () => {
    it('debería crear una nueva especificación técnica', async () => {
      const dto: CrearEspecificacionTecnicaDto = {
        item: 'Item001',
        especificacion: 'Especificación de prueba',
        descripcion: 'Descripción de prueba',
        cantidad: 10,
        valorUnitario: 5000,
        valorTotal: 50000,
        contratoGeneralId: 1,
        activo: true,
        fechaCreacion: new Date(), 
        fechaModificacion: new Date(),
      };
      const result = { id: 1, ...dto };
      mockRepository.save.mockResolvedValue(result);
  
      expect(await service.create(dto)).toBe(result);
      expect(mockRepository.save).toHaveBeenCalledWith(dto);
    });
  });  

  describe('update', () => {
    it('debería actualizar una especificación técnica', async () => {
      const id = 1;
      const dto: ActualizarEspecificacionTecnicaDto = {
        especificacion: 'Especificación actualizada',
        cantidad: 20,
      };
      const updatedEspecificacion = { id, ...dto };
      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOne.mockResolvedValue(updatedEspecificacion);

      const result = await service.update(id, dto);

      expect(result).toEqual(updatedEspecificacion);
      expect(mockRepository.update).toHaveBeenCalledWith(id, dto);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('debería lanzar un error si la especificación técnica no se encuentra al actualizar', async () => {
      const id = 1;
      const dto: ActualizarEspecificacionTecnicaDto = { especificacion: 'Nueva especificación' };
      mockRepository.update.mockResolvedValue({ affected: 0 });

      await expect(service.update(id, dto)).rejects.toThrow(
        'EspecificacionTecnica con ID "1" no encontrada',
      );
    });
  });

  describe('remove', () => {
    it('debería marcar como inactivo una especificación técnica', async () => {
      const id = 1;
      const mockEspecificacion = { id, activo: true };
      mockRepository.findOne.mockResolvedValue(mockEspecificacion);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      await service.remove(id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(mockRepository.update).toHaveBeenCalledWith(id, {
        activo: false,
        fechaModificacion: expect.any(Date),
      });
    });

    it('debería lanzar un error si la especificación técnica no se encuentra al eliminar', async () => {
      const id = 1;
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow(
        `EspecificacionTecnica con ID "${id}" no encontrada`,
      );
    });
  });
});
