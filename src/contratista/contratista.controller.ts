import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContratistaService } from './contratista.service';
import { CreateContratistaDto } from './dto/create-contratista.dto';
import { Contratista } from './entities/contratista.entity';
import { UpdateContratistaDto } from './dto/update-contratista.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('contratistas')
@Controller('contratistas')
export class ContratistaController {
  constructor(private readonly contratistaService: ContratistaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contratista' })
  @ApiBody({ type: CreateContratistaDto })
  @ApiResponse({
    status: 201,
    description: 'El contratista ha sido creado exitosamente.',
    type: Contratista,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  create(
    @Body() createContratistaDto: CreateContratistaDto,
  ): Promise<Contratista> {
    return this.contratistaService.create(createContratistaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los contratistas' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los contratistas.',
    type: [Contratista],
  })
  findAll(): Promise<Contratista[]> {
    return this.contratistaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un contratista por id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el contratista.',
    type: Contratista,
  })
  @ApiResponse({ status: 404, description: 'Contratista no encontrado.' })
  findOne(@Param('id') id: string): Promise<Contratista> {
    return this.contratistaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un contratista' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateContratistaDto })
  @ApiResponse({
    status: 200,
    description: 'El contratista ha sido actualizado exitosamente.',
    type: Contratista,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 404, description: 'Contratista no encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updateContratistaDto: UpdateContratistaDto,
  ): Promise<Contratista> {
    return this.contratistaService.update(id, updateContratistaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un contratista' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'El contratista ha sido eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Contratista no encontrado.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.contratistaService.remove(id);
  }

  @Get('by-contrato/:contratoId')
  @ApiOperation({ summary: 'Obtener contratista por id de contrato' })
  @ApiParam({ name: 'contratoId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el contratista para el contrato especificado.',
    type: Contratista,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró contratista para el contrato especificado.',
  })
  findByContrato(
    @Param('contratoId') contratoId: string,
  ): Promise<Contratista> {
    return this.contratistaService.findByContratoGeneralId(+contratoId);
  }
}
