import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { ContratoGeneralService } from './contrato-general.service';
import { CrearContratoGeneralDto } from './dto/crear-contrato-general.dto';
import { ActualizarContratoGeneralDto } from './dto/actualizar-contrato-general.dto';
import { ContratoGeneral } from './entities/contrato-general.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { StandardResponse } from '../utils/standardResponse.interface';
import { BaseQueryParamsDto } from '../shared/dto/query-params.base.dto';

@ApiTags('contratos-generales')
@Controller('contratos-generales')
export class ContratoGeneralController {
  constructor(
    private readonly contratoGeneralService: ContratoGeneralService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los contratos generales' })
  @ApiResponse({
    status: 200,
    description: 'Lista de contratos generales',
    type: [ContratoGeneral],
  })
  @ApiQuery({
    name: 'include',
    required: false,
    description:
      'Relaciones a incluir (separadas por comas). Ejemplo: estados,solicitante,lugarEjecucion',
  })
  @ApiQuery({
    name: 'query',
    required: false,
    description:
      'Filtros en formato JSON. Puede incluir filtros para campos de relaciones usando notación punto. Ejemplo: {"estados.estado_parametro_id":1,"solicitante.dependencia_solicitante_id":101}',
  })
  @ApiQuery({
    name: 'fields',
    required: false,
    description: 'Campos a incluir en la respuesta (separados por comas)',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Campo por el cual ordenar',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'Dirección del ordenamiento (ASC o DESC)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número máximo de registros a retornar',
    type: Number,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Número de registros a saltar',
    type: Number,
  })
  async findAll(
    @Query() queryParams: BaseQueryParamsDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const [contratos, metadata] =
        await this.contratoGeneralService.findAll(queryParams);
      const response: StandardResponse<ContratoGeneral[]> = {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contratos generales encontrados',
        Data: contratos,
        Metadata: metadata,
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const response: StandardResponse<any> = {
        Success: false,
        Status: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: 'Error al obtener los contratos generales',
        Data: error.message,
      };
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un contrato general por ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID del contrato general',
  })
  @ApiQuery({
    name: 'include',
    required: false,
    description:
      'Relaciones a incluir (separadas por comas). Ejemplo: estados,solicitante,lugarEjecucion',
  })
  @ApiResponse({
    status: 200,
    description: 'Contrato general encontrado',
    type: ContratoGeneral,
  })
  @ApiResponse({ status: 404, description: 'Contrato general no encontrado' })
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
    @Query() queryParams: BaseQueryParamsDto,
  ): Promise<void> {
    try {
      const contract = await this.contratoGeneralService.findOne(
        +id,
        queryParams,
      );
      const response: StandardResponse<ContratoGeneral> = {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contrato general encontrado',
        Data: contract,
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const response: StandardResponse<any> = {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Contrato general no encontrado',
        Data: error,
      };
      res.status(HttpStatus.NOT_FOUND).json(response);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contrato general' })
  @ApiBody({ type: CrearContratoGeneralDto })
  @ApiResponse({
    status: 201,
    description: 'Contrato general creado',
    type: ContratoGeneral,
  })
  async create(
    @Res() res: Response,
    @Body() createContratoGenneralDto: CrearContratoGeneralDto,
  ): Promise<void> {
    try {
      const saved = await this.contratoGeneralService.create(
        createContratoGenneralDto,
      );
      const response: StandardResponse<ContratoGeneral> = {
        Success: true,
        Status: HttpStatus.CREATED,
        Message: 'Contrato general creado',
        Data: saved,
      };
      res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      const response: StandardResponse<any> = {
        Success: false,
        Status: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: 'Error al crear el contrato general',
        Data: error,
      };
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un contrato general' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID del contrato general a actualizar',
  })
  @ApiBody({ type: ActualizarContratoGeneralDto })
  @ApiResponse({
    status: 200,
    description: 'Contrato general actualizado',
    type: ContratoGeneral,
  })
  @ApiResponse({ status: 404, description: 'Contrato general no encontrado' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() actualizarContratoGeneralDto: ActualizarContratoGeneralDto,
  ): Promise<void> {
    try {
      const contract = await this.contratoGeneralService.update(
        +id,
        actualizarContratoGeneralDto,
      );
      const response: StandardResponse<ContratoGeneral> = {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contrato general actualizado',
        Data: contract,
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const response: StandardResponse<any> = {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Contrato general no encontrado',
        Data: error,
      };
      res.status(HttpStatus.NOT_FOUND).json(response);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un contrato general' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID del contrato general a eliminar',
  })
  @ApiResponse({ status: 200, description: 'Contrato general eliminado' })
  @ApiResponse({ status: 404, description: 'Contrato general no encontrado' })
  async remove(@Res() res: Response, @Param('id') id: string): Promise<void> {
    try {
      await this.contratoGeneralService.remove(+id);
      const response: StandardResponse<any> = {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contrato general eliminado',
        Data: null,
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const response: StandardResponse<any> = {
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Contrato general no encontrado',
        Data: error,
      };
      res.status(HttpStatus.NOT_FOUND).json(response);
    }
  }
}
