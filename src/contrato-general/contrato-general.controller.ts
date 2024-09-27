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
import { ContratoGeneral } from './entities/contrato-general.entity';
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
    type: [ContratoGeneral],
  })
  findAll(): Promise<ContratoGeneral[]> {
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
    type: ContratoGeneral,
  })
  @ApiResponse({ status: 404, description: 'Contrato general no encontrado' })
  findOne(@Param('id') id: string): Promise<ContratoGeneral> {
    return this.contratoGeneralService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contrato general' })
  @ApiBody({ type: CrearContratoGeneralDto })
  @ApiResponse({
    status: 201,
    description: 'Contrato general creado',
    type: ContratoGeneral,
  })
  create(
    @Body() createContratogenneralDto: CrearContratoGeneralDto,
  ): Promise<ContratoGeneral> {
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
    type: ContratoGeneral,
  })
  @ApiResponse({ status: 404, description: 'Contrato general no encontrado' })
  update(
    @Param('id') id: string,
    @Body() actualizarContratoGeneralDto: ActualizarContratoGeneralDto,
  ): Promise<ContratoGeneral> {
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
