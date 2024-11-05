import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActaInicioService } from './acta-inicio.service';
import { CrearActaInicioDto } from './dto/crear-acta-inicio.dto';
import { ActualizarActaInicioDto } from './dto/actualizar-acta-inicio.dto';
import { ActaInicio } from './entities/acta-inicio-entity';

describe('ActaInicioService', () => {
  let service: ActaInicioService;
  let repository: Repository<ActaInicio>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActaInicioService,
        {
          provide: getRepositoryToken(ActaInicio),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ActaInicioService>(ActaInicioService);
    repository = module.get<Repository<ActaInicio>>(
      getRepositoryToken(ActaInicio),
    );
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debería devolver un array de actas de inicio', async () => {
      const result = [{ id: 1 }, { id: 2 }];
      mockRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería devolver un acta de inicio por id', async () => {
      const result = { id: 1 };
      mockRepository.findOne.mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('create', () => {
    it('debería crear un nuevo acta de inicio', async () => {
      const dto: CrearActaInicioDto = {
        usuario_id: 1,
        usuario_legado: 'legacy_user',
        descripcion: 'Acta inicial de prueba',
        fecha_inicio: '2023-10-24', 
        fecha_fin: '2023-11-24',    
        contrato_general_id: 1,
        activo: true,
      };      
      const result = { id: 1, ...dto, fecha_creacion: new Date(), fecha_modificacion: new Date() };
      mockRepository.save.mockResolvedValue(result);
  
      expect(await service.create(dto)).toBe(result);
      expect(mockRepository.save).toHaveBeenCalledWith(dto);
    });
  });  

  describe('update', () => {
    it('debería actualizar un acta de inicio', async () => {
      const id = 1;
      const dto: ActualizarActaInicioDto = {
        usuario_id: 1,
        usuario_legado: 'user_legacy prueba',
        descripcion: 'Acta modificada',
        fecha_inicio: '2023-10-24',
        fecha_fin: '2023-11-24',
        activo: false,
      };      
      const updatedActa = { id, ...dto };
      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOne.mockResolvedValue(updatedActa);

      const result = await service.update(id, dto);

      expect(result).toEqual(updatedActa);
      expect(mockRepository.update).toHaveBeenCalledWith(id, dto);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('remove', () => {
    it('debería marcar como inactivo un acta de inicio', async () => {
      const id = 1;
      const mockActa = { id, activo: true };
      mockRepository.findOne.mockResolvedValue(mockActa);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      await service.remove(id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(mockRepository.update).toHaveBeenCalledWith(id, {
        activo: false,
        fecha_modificacion: expect.any(Date),
      });
    });

    it('debería lanzar un error si el acta de inicio no se encuentra', async () => {
      const id = 1;
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow(
        `ActaInicio con ID "${id}" no encontrada`,
      );
    });
  });
});
