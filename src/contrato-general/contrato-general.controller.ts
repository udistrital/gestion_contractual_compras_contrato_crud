import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ContratoGeneralService } from './contrato-general.service';
import { CrearContratoGeneralDto } from './dto/crear-contrato-general.dto';
import { ActualizarContratoGeneralDto } from './dto/actualizar-contrato-general.dto';
import { ContratoGeneralEntity } from './entities/contrato-general.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

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
    type: [ContratoGeneralEntity],
  })
  findAll(): Promise<ContratoGeneralEntity[]> {
    return this.contratoGeneralService.findAll();
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
    type: ContratoGeneralEntity,
  })
  @ApiResponse({ status: 404, description: 'Contrato general no encontrado' })
  findOne(@Param('id') id: string): Promise<ContratoGeneralEntity> {
    return this.contratoGeneralService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contrato general' })
  @ApiBody({ type: CrearContratoGeneralDto })
  @ApiResponse({
    status: 201,
    description: 'Contrato general creado',
    type: ContratoGeneralEntity,
  })
  create(
    @Body() createContratogenneralDto: CrearContratoGeneralDto,
  ): Promise<ContratoGeneralEntity> {
    return this.contratoGeneralService.create(createContratogenneralDto);
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
    type: ContratoGeneralEntity,
  })
  @ApiResponse({ status: 404, description: 'Contrato general no encontrado' })
  update(
    @Param('id') id: string,
    @Body() actualizarContratoGeneralDto: ActualizarContratoGeneralDto,
  ): Promise<ContratoGeneralEntity> {
    return this.contratoGeneralService.update(
      +id,
      actualizarContratoGeneralDto,
    );
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
  remove(@Param('id') id: string): Promise<void> {
    return this.contratoGeneralService.remove(+id);
  }
}
