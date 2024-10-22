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
import { CdpService } from './cdp.service';
import { CreateCdpDto } from './dto/create-cdp.dto';
import { UpdateCdpDto } from './dto/update-cdp.dto';
import { Cdp } from './entities/cdp.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { StandardResponse } from '../utils/standardResponse.interface';

@ApiTags('cdp')
@Controller('cdp')
export class CdpController {
  constructor(private readonly cdpService: CdpService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo CDP' })
  @ApiBody({ type: CreateCdpDto })
  @ApiResponse({
    status: 201,
    description: 'El CDP ha sido creado exitosamente.',
    type: Cdp,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  async create(
    @Body() createCdpDto: CreateCdpDto,
  ): Promise<StandardResponse<Cdp>> {
    try {
      const saved = await this.cdpService.create(createCdpDto);
      return {
        Success: true,
        Status: HttpStatus.CREATED,
        Message: 'CDP creado exitosamente',
        Data: saved,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: 'Error al crear el CDP',
        Data: error,
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los CDPs' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los CDPs.',
    type: [Cdp],
  })
  async findAll(): Promise<StandardResponse<Cdp[]>> {
    try {
      const cdps = await this.cdpService.findAll();
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'CDPs encontrados',
        Data: cdps,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'CDPs no encontrados',
        Data: error,
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un CDP por ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el CDP encontrado.',
    type: Cdp,
  })
  @ApiResponse({ status: 404, description: 'CDP no encontrado.' })
  async findOne(@Param('id') id: number): Promise<StandardResponse<Cdp>> {
    try {
      const found = await this.cdpService.findOne(id);
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'CDP encontrado',
        Data: found,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'CDP no encontrado',
        Data: error,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un CDP' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateCdpDto })
  @ApiResponse({
    status: 200,
    description: 'El CDP ha sido actualizado exitosamente.',
    type: Cdp,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 404, description: 'CDP no encontrado.' })
  async update(
    @Param('id') id: number,
    @Body() updateCdpDto: UpdateCdpDto,
  ): Promise<StandardResponse<Cdp>> {
    try {
      const updated = await this.cdpService.update(id, updateCdpDto);
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'CDP actualizado exitosamente',
        Data: updated,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'CDP no encontrado',
        Data: error,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un CDP' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'El CDP ha sido eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'CDP no encontrado.' })
  async remove(@Param('id') id: number): Promise<StandardResponse<void>> {
    try {
      await this.cdpService.remove(id);
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'CDP eliminado exitosamente',
        Data: null,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'CDP no encontrado',
        Data: error,
      };
    }
  }

  @Get('contrato/:contratoId')
  @ApiOperation({ summary: 'Obtener CDPs por ID de contrato' })
  @ApiParam({ name: 'contratoId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve los CDPs para el contrato especificado.',
    type: [Cdp],
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron CDPs para el contrato especificado.',
  })
  async findByContrato(
    @Param('contratoId') contratoId: number,
  ): Promise<StandardResponse<Cdp[]>> {
    try {
      const result = await this.cdpService.findByContratoGeneralId(contratoId);
      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'CDPs encontrados',
        Data: result,
      };
    } catch (error) {
      return {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'CDPs no encontrados',
        Data: error,
      };
    }
  }
}
