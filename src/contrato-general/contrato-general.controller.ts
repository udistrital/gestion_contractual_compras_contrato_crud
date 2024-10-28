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
} from '@nestjs/swagger';
import { StandardResponse } from '../utils/standardResponse.interface';

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
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const contracts = await this.contratoGeneralService.findAll();
      const response: StandardResponse<ContratoGeneral[]> = {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Contratos generales encontrados',
        Data: contracts,
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const response: StandardResponse<any> = {
        Success: false,
        Status: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: 'Error al obtener los contratos generales',
        Data: error,
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
  @ApiResponse({
    status: 200,
    description: 'Contrato general encontrado',
    type: ContratoGeneral,
  })
  @ApiResponse({ status: 404, description: 'Contrato general no encontrado' })
  async findOne(@Res() res: Response, @Param('id') id: string): Promise<void> {
    try {
      const contract = await this.contratoGeneralService.findOne(+id);
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
