import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
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
import { StandardResponse } from '../utils/standardResponse.interface';

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
  async create(
    @Body() createContratistaDto: CreateContratistaDto,
  ): Promise<StandardResponse<Contratista>> {
    try {
      const saved = await this.contratistaService.create(createContratistaDto);
      return {
        Success: true,
        Status: HttpStatus.CREATED,
        Message: 'Contratista creado',
        Data: saved,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: 'Error al crear el contratista',
        Data: error,
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los contratistas' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los contratistas.',
    type: [Contratista],
  })
  async findAll(): Promise<StandardResponse<Contratista[]>> {
    try {
      const contratistas = await this.contratistaService.findAll();
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contratistas encontrados',
        Data: contratistas,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Contratistas no encontrados',
        Data: error,
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un contratista por numero_identificacion' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el contratista.',
    type: Contratista,
  })
  @ApiResponse({ status: 404, description: 'Contratista no encontrado.' })
  async findOne(
    @Param('id') id: string,
  ): Promise<StandardResponse<Contratista>> {
    try {
      const found = await this.contratistaService.findOne(id);
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contratista encontrado',
        Data: found,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Contratista no encontrado',
        Data: error,
      };
    }
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
  async update(
    @Param('id') id: string,
    @Body() updateContratistaDto: UpdateContratistaDto,
  ): Promise<StandardResponse<Contratista>> {
    try {
      const updated = await this.contratistaService.update(
        id,
        updateContratistaDto,
      );
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contratista actualizado',
        Data: updated,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Contratista no encontrado',
        Data: error,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un contratista' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'El contratista ha sido eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Contratista no encontrado.' })
  async remove(@Param('id') id: string): Promise<StandardResponse<void>> {
    try {
      await this.contratistaService.remove(id);
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contratista eliminado',
        Data: null,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Contratista no encontrado',
        Data: error,
      };
    }
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
  async findByContrato(
    @Param('contratoId') contratoId: string,
  ): Promise<StandardResponse<Contratista>> {
    try {
      const result =
        await this.contratistaService.findByContratoGeneralId(+contratoId);
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contratista encontrado',
        Data: result,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Contratista no encontrado',
        Data: error,
      };
    }
  }
}
