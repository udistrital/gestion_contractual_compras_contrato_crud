import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdenadorContratoService } from './ordenador-contrato.service';
import { CreateOrdenadorContratoDto } from './dto/create-ordenador-contrato.dto';
import { UpdateOrdenadorContratoDto } from './dto/update-ordenador-contrato.dto';

@Controller('ordenador-contrato')
export class OrdenadorContratoController {
  constructor(private readonly ordenadorContratoService: OrdenadorContratoService) {}

  @Post()
  create(@Body() createOrdenadorContratoDto: CreateOrdenadorContratoDto) {
    return this.ordenadorContratoService.create(createOrdenadorContratoDto);
  }

  @Get()
  findAll() {
    return this.ordenadorContratoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenadorContratoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenadorContratoDto: UpdateOrdenadorContratoDto) {
    return this.ordenadorContratoService.update(+id, updateOrdenadorContratoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenadorContratoService.remove(+id);
  }
}
