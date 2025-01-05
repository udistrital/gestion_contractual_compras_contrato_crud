import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { SupervisorEntity } from './entities/supervisor.entity';

@ApiTags('supervisores')
@Controller('supervisores')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo supervisor' })
  @ApiBody({ type: CreateSupervisorDto })
  @ApiResponse({
    status: 201,
    description: 'El Supervisor ha sido creado exitosamente.',
    type: SupervisorEntity,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  create(@Body() createSupervisorDto: CreateSupervisorDto) {
    return this.supervisorService.create(createSupervisorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los supervisores' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los supervisores.',
    type: [SupervisorEntity],
  })
  findAll() {
    return this.supervisorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un supervisor por id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el supervisor especificado.',
    type: SupervisorEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Supervisor no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.supervisorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un supervisor' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateSupervisorDto })
  @ApiResponse({
    status: 200,
    description: 'El supervisor ha sido actualizado exitosamente.',
    type: SupervisorEntity,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({
    status: 404,
    description: 'Supervisor no encontrado.',
  })
  update(
    @Param('id') id: string,
    @Body() updateSupervisorDto: UpdateSupervisorDto,
  ) {
    return this.supervisorService.update(+id, updateSupervisorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Supervisor' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'El Supervisor ha sido eliminado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Supervisor no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.supervisorService.remove(+id);
  }

  @Get('contrato/:contratoId')
  @ApiOperation({ summary: 'Obtiene el supervisor por id de contrato' })
  @ApiParam({ name: 'contratoId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve los supervisores para el contrato especificado.',
    type: [SupervisorEntity],
  })
  @ApiResponse({
    status: 404,
    description: 'No se supervisores para el contrato especificado.',
  })
  findByContratoGeneralId(@Param('contratoId') contratoId: string) {
    return this.supervisorService.findByContratoGeneralId(+contratoId);
  }
}
