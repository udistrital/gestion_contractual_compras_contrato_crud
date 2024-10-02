import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LugarEjecucionService } from './lugar-ejecucion.service';
import { CreateLugarEjecucionDto } from './dto/create-lugar-ejecucion.dto';
import { UpdateLugarEjecucionDto } from './dto/update-lugar-ejecucion.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { LugarEjecucion } from './entities/lugar-ejecucion.entity';

@ApiTags('lugares-ejecucion')
@Controller('lugares-ejecucion')
export class LugarEjecucionController {
  constructor(private readonly lugarEjecucionService: LugarEjecucionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo lugar de ejecución' })
  @ApiBody({ type: CreateLugarEjecucionDto })
  @ApiResponse({
    status: 201,
    description: 'El lugar de ejecución ha sido creado exitosamente.',
    type: LugarEjecucion,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  create(@Body() createLugarEjecucionDto: CreateLugarEjecucionDto) {
    return this.lugarEjecucionService.create(createLugarEjecucionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los lugares de ejecución' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los lugares de ejecución.',
    type: [LugarEjecucion],
  })
  findAll() {
    return this.lugarEjecucionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un lugar de ejecución por id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el lugar de ejecución.',
    type: LugarEjecucion,
  })
  @ApiResponse({
    status: 404,
    description: 'Lugar de ejecución no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.lugarEjecucionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un lugar de ejecución' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateLugarEjecucionDto })
  @ApiResponse({
    status: 200,
    description: 'El lugar de ejecución ha sido actualizado exitosamente.',
    type: LugarEjecucion,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({
    status: 404,
    description: 'Lugar de ejecución no encontrado.',
  })
  update(
    @Param('id') id: string,
    @Body() updateLugarEjecucionDto: UpdateLugarEjecucionDto,
  ) {
    return this.lugarEjecucionService.update(+id, updateLugarEjecucionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un lugar de ejecución' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'El lugar de ejecución ha sido eliminado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Lugar de ejecución no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.lugarEjecucionService.remove(+id);
  }

  @Get('contrato/:contratoId')
  @ApiOperation({ summary: 'Obtiene el lugar de ejecución por id de contrato' })
  @ApiParam({ name: 'contratoId', type: 'string' })
  @ApiResponse({
    status: 200,
    description:
      'Devuelve los lugares de ejecución para el contrato especificado.',
    type: [LugarEjecucion],
  })
  @ApiResponse({
    status: 404,
    description:
      'No se encontraron lugares de ejecución para el contrato especificado.',
  })
  findByContratoGeneralId(@Param('contratoId') contratoId: string) {
    return this.lugarEjecucionService.findByContratoGeneralId(+contratoId);
  }
}
