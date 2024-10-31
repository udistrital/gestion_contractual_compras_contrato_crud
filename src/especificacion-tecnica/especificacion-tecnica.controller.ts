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
  import { EspecificacionTecnicaService } from './especificacion-tecnica.service';
  import { CrearEspecificacionTecnicaDto } from './dto/crear-especificacion-tecnica.dto';
  import { EspecificacionTecnica } from './entities/especificacion-tecnica.entity';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
  } from '@nestjs/swagger';
  import { StandardResponse } from '../utils/standardResponse.interface';
import { ActualizarEspecificacionTecnicaDto } from './dto/actualizar-especificacion-tecnica';
  
  @ApiTags('especificaciones-tecnicas')
  @Controller('especificaciones-tecnicas')
  export class EspecificacionTecnicaController {
    constructor(
      private readonly especificacionTecnicaService: EspecificacionTecnicaService,
    ) {}
  
    @Get()
    @ApiOperation({ summary: 'Obtener todas las especificaciones técnicas' })
    @ApiResponse({
      status: 200,
      description: 'Lista de especificaciones técnicas',
      type: [EspecificacionTecnica],
    })
    async findAll(@Res() res: Response): Promise<void> {
      try {
        const especificaciones = await this.especificacionTecnicaService.findAll();
        const response: StandardResponse<EspecificacionTecnica[]> = {
          Success: true,
          Status: HttpStatus.OK,
          Message: 'Especificaciones técnicas encontradas',
          Data: especificaciones,
        };
        res.status(HttpStatus.OK).json(response);
      } catch (error) {
        const response: StandardResponse<any> = {
          Success: false,
          Status: HttpStatus.INTERNAL_SERVER_ERROR,
          Message: 'Error al obtener las especificaciones técnicas',
          Data: error,
        };
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener una especificación técnica por ID' })
    @ApiParam({
      name: 'id',
      type: 'number',
      description: 'ID de la especificación técnica',
    })
    @ApiResponse({
      status: 200,
      description: 'Especificación técnica encontrada',
      type: EspecificacionTecnica,
    })
    @ApiResponse({ status: 404, description: 'Especificación técnica no encontrada' })
    async findOne(@Res() res: Response, @Param('id') id: string): Promise<void> {
      try {
        const especificacion = await this.especificacionTecnicaService.findOne(+id);
        const response: StandardResponse<EspecificacionTecnica> = {
          Success: true,
          Status: HttpStatus.OK,
          Message: 'Especificación técnica encontrada',
          Data: especificacion,
        };
        res.status(HttpStatus.OK).json(response);
      } catch (error) {
        const response: StandardResponse<any> = {
          Success: false,
          Status: HttpStatus.NOT_FOUND,
          Message: 'Especificación técnica no encontrada',
          Data: error,
        };
        res.status(HttpStatus.NOT_FOUND).json(response);
      }
    }
  
    @Post()
    @ApiOperation({ summary: 'Crear una nueva especificación técnica' })
    @ApiBody({ type: CrearEspecificacionTecnicaDto })
    @ApiResponse({
      status: 201,
      description: 'Especificación técnica creada',
      type: EspecificacionTecnica,
    })
    async create(
      @Res() res: Response,
      @Body() crearEspecificacionTecnicaDto: CrearEspecificacionTecnicaDto,
    ): Promise<void> {
      try {
        const especificacion = await this.especificacionTecnicaService.create(
          crearEspecificacionTecnicaDto,
        );
        const response: StandardResponse<EspecificacionTecnica> = {
          Success: true,
          Status: HttpStatus.CREATED,
          Message: 'Especificación técnica creada',
          Data: especificacion,
        };
        res.status(HttpStatus.CREATED).json(response);
      } catch (error) {
        const response: StandardResponse<any> = {
          Success: false,
          Status: HttpStatus.INTERNAL_SERVER_ERROR,
          Message: 'Error al crear la especificación técnica',
          Data: error,
        };
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una especificación técnica' })
    @ApiParam({
      name: 'id',
      type: 'number',
      description: 'ID de la especificación técnica a actualizar',
    })
    @ApiBody({ type: ActualizarEspecificacionTecnicaDto })
    @ApiResponse({
      status: 200,
      description: 'Especificación técnica actualizada',
      type: EspecificacionTecnica,
    })
    @ApiResponse({ status: 404, description: 'Especificación técnica no encontrada' })
    async update(
      @Res() res: Response,
      @Param('id') id: string,
      @Body() actualizarEspecificacionTecnicaDto: ActualizarEspecificacionTecnicaDto,
    ): Promise<void> {
      try {
        const especificacion = await this.especificacionTecnicaService.update(
          +id,
          actualizarEspecificacionTecnicaDto,
        );
        const response: StandardResponse<EspecificacionTecnica> = {
          Success: true,
          Status: HttpStatus.OK,
          Message: 'Especificación técnica actualizada',
          Data: especificacion,
        };
        res.status(HttpStatus.OK).json(response);
      } catch (error) {
        const response: StandardResponse<any> = {
          Success: false,
          Status: HttpStatus.NOT_FOUND,
          Message: 'Especificación técnica no encontrada',
          Data: error,
        };
        res.status(HttpStatus.NOT_FOUND).json(response);
      }
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una especificación técnica' })
    @ApiParam({
      name: 'id',
      type: 'number',
      description: 'ID de la especificación técnica a eliminar',
    })
    @ApiResponse({ status: 200, description: 'Especificación técnica eliminada' })
    @ApiResponse({ status: 404, description: 'Especificación técnica no encontrada' })
    async remove(@Res() res: Response, @Param('id') id: string): Promise<void> {
      try {
        await this.especificacionTecnicaService.remove(+id);
        const response: StandardResponse<any> = {
          Success: true,
          Status: HttpStatus.OK,
          Message: 'Especificación técnica eliminada',
          Data: null,
        };
        res.status(HttpStatus.OK).json(response);
      } catch (error) {
        const response: StandardResponse<any> = {
          Success: false,
          Status: HttpStatus.NOT_FOUND,
          Message: 'Especificación técnica no encontrada',
          Data: error,
        };
        res.status(HttpStatus.NOT_FOUND).json(response);
      }
    }
  }
  