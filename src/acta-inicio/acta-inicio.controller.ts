import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ActaInicioService } from './acta-inicio.service';
import { CrearActaInicioDto } from './dto/crear-acta-inicio.dto';
import { ActualizarActaInicioDto } from './dto/actualizar-acta-inicio.dto';

@ApiTags('acta-inicio')
@Controller('acta-inicio')
export class ActaInicioController {
  constructor(private readonly actaInicioService: ActaInicioService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las actas de inicio' })
  findAll() {
    return this.actaInicioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una acta de inicio por ID' })
  findOne(@Param('id') id: string) {
    return this.actaInicioService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva acta de inicio' })
  create(@Body() crearActaInicioDto: CrearActaInicioDto) {
    console.log('DTO recibido en el controlador:', crearActaInicioDto); // Verifica el DTO recibido
    return this.actaInicioService.create(crearActaInicioDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una acta de inicio' })
  update(@Param('id') id: string, @Body() actualizarActaInicioDto: ActualizarActaInicioDto) {
    return this.actaInicioService.update(+id, actualizarActaInicioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una acta de inicio' })
  remove(@Param('id') id: string) {
    return this.actaInicioService.remove(+id);
  }
}
