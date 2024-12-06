import { Injectable } from '@nestjs/common';
import { CreateOrdenadorContratoDto } from './dto/create-ordenador-contrato.dto';
import { UpdateOrdenadorContratoDto } from './dto/update-ordenador-contrato.dto';

@Injectable()
export class OrdenadorContratoService {
  create(createOrdenadorContratoDto: CreateOrdenadorContratoDto) {
    return 'This action adds a new ordenadorContrato';
  }

  findAll() {
    return `This action returns all ordenadorContrato`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordenadorContrato`;
  }

  update(id: number, updateOrdenadorContratoDto: UpdateOrdenadorContratoDto) {
    return `This action updates a #${id} ordenadorContrato`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordenadorContrato`;
  }
}
