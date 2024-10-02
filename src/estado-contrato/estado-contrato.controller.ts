import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstadoContratoService } from './estado-contrato.service';
import { CreateEstadoContratoDto } from './dto/create-estado-contrato.dto';
import { UpdateEstadoContratoDto } from './dto/update-estado-contrato.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { EstadoContrato } from './entities/estado-contrato.entity';

@ApiTags('estados-contrato')
@Controller('estados-contrato')
export class EstadoContratoController {
  constructor(private readonly estadoContratoService: EstadoContratoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo estado de contrato' })
  @ApiBody({ type: CreateEstadoContratoDto })
  @ApiResponse({
    status: 201,
    description: 'El estado de contrato ha sido creado exitosamente.',
    type: EstadoContrato,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  create(@Body() createEstadoContratoDto: CreateEstadoContratoDto) {
    return this.estadoContratoService.create(createEstadoContratoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estados de contrato' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los estados de contrato.',
    type: [EstadoContrato],
  })
  findAll() {
    return this.estadoContratoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estado de contrato por id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el estado de contrato.',
    type: EstadoContrato,
  })
  @ApiResponse({
    status: 404,
    description: 'Estado de contrato no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.estadoContratoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un estado de contrato' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateEstadoContratoDto })
  @ApiResponse({
    status: 200,
    description: 'El estado de contrato ha sido actualizado exitosamente.',
    type: EstadoContrato,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({
    status: 404,
    description: 'Estado de contrato no encontrado.',
  })
  update(
    @Param('id') id: string,
    @Body() updateEstadoContratoDto: UpdateEstadoContratoDto,
  ) {
    return this.estadoContratoService.update(+id, updateEstadoContratoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un estado de contrato' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'El estado de contrato ha sido eliminado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Estado de contrato no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.estadoContratoService.remove(+id);
  }

  @Get('contrato/:contratoId')
  @ApiOperation({ summary: 'Obtener estados de contrato por id de contrato' })
  @ApiParam({ name: 'contratoId', type: 'string' })
  @ApiResponse({
    status: 200,
    description:
      'Devuelve los estados de contrato para el contrato especificado.',
    type: [EstadoContrato],
  })
  @ApiResponse({
    status: 404,
    description:
      'No se encontraron estados de contrato para el contrato especificado.',
  })
  findByContratoGeneral(@Param('contratoId') contratoId: string) {
    return this.estadoContratoService.findByContratoGeneral(+contratoId);
  }

  @Get('contrato/:contratoId/actual')
  @ApiOperation({ summary: 'Obtener el estado actual de un contrato' })
  @ApiParam({ name: 'contratoId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el estado actual del contrato especificado.',
    type: EstadoContrato,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró estado actual para el contrato especificado.',
  })
  findCurrentEstado(@Param('contratoId') contratoId: string) {
    return this.estadoContratoService.findCurrentEstado(+contratoId);
  }
}
