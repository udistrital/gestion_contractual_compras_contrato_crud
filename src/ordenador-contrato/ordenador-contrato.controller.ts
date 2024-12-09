import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { OrdenadorContratoService } from './ordenador-contrato.service';
import { CreateOrdenadorContratoDto } from './dto/create-ordenador-contrato.dto';
import { UpdateOrdenadorContratoDto } from './dto/update-ordenador-contrato.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('ordenadores-contrato')
@Controller('ordenador-contrato')
export class OrdenadorContratoController {
  constructor(private readonly ordenadorContratoService: OrdenadorContratoService) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los ordenadores' })
  findAll() {
    return this.ordenadorContratoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ordenador por ID' })
  findOne(@Param('id') id: string) {
    return this.ordenadorContratoService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo ordenador' })
  create(@Body() createOrdenadorContratoDto: CreateOrdenadorContratoDto) {
    console.log('DTO recibido en el controlador:', createOrdenadorContratoDto)
    return this.ordenadorContratoService.create(createOrdenadorContratoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un ordenador' })
  update(
    @Param('id') id: string,
    @Body() updateOrdenadorContratoDto: UpdateOrdenadorContratoDto
  ) {
    return this.ordenadorContratoService.update(+id, updateOrdenadorContratoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ordenador' })
  remove(@Param('id') id: string) {
    return this.ordenadorContratoService.remove(+id);
  }
}
