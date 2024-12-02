import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SolicitanteService } from './solicitante.service';
import { CreateSolicitanteDto } from './dto/create-solicitante.dto';
import { UpdateSolicitanteDto } from './dto/update-solicitante.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { SolicitanteEntity } from './entities/solicitante.entity';

@ApiTags('solicitantes')
@Controller('solicitantes')
export class SolicitanteController {
  constructor(private readonly solicitantesService: SolicitanteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo lugar de ejecución' })
  @ApiBody({ type: CreateSolicitanteDto })
  @ApiResponse({
    status: 201,
    description: 'El Solicitante ha sido creado exitosamente.',
    type: SolicitanteEntity,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  create(@Body() createSolicitanteDto: CreateSolicitanteDto) {
    return this.solicitantesService.create(createSolicitanteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los lugares de ejecución' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los solicitantes.',
    type: [SolicitanteEntity],
  })
  findAll() {
    return this.solicitantesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un lugar de ejecución por id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el solicitante especificado.',
    type: SolicitanteEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Lugar de ejecución no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.solicitantesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un lugar de ejecución' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateSolicitanteDto })
  @ApiResponse({
    status: 200,
    description: 'El solicitante ha sido actualizado exitosamente.',
    type: SolicitanteEntity,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({
    status: 404,
    description: 'Solictante no encontrado.',
  })
  update(
    @Param('id') id: string,
    @Body() updateSolicitanteDto: UpdateSolicitanteDto,
  ) {
    return this.solicitantesService.update(+id, updateSolicitanteDto);
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
    return this.solicitantesService.remove(+id);
  }

  @Get('contrato/:contratoId')
  @ApiOperation({ summary: 'Obtiene el lugar de ejecución por id de contrato' })
  @ApiParam({ name: 'contratoId', type: 'string' })
  @ApiResponse({
    status: 200,
    description:
      'Devuelve los lugares de ejecución para el contrato especificado.',
    type: [SolicitanteEntity],
  })
  @ApiResponse({
    status: 404,
    description:
      'No se encontraron lugares de ejecución para el contrato especificado.',
  })
  findByContratoGeneralId(@Param('contratoId') contratoId: string) {
    return this.solicitantesService.findByContratoGeneralId(+contratoId);
  }
}
