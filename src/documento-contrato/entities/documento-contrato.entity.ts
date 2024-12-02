import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContratoGeneral } from '../../contrato-general/entities/contrato-general.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class DocumentoContrato {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Identificador único del documento',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 1,
    required: false,
    description: 'ID Tipo Documento - Parámetros CRUD',
  })
  @Column({ type: 'integer', nullable: true })
  tipo_documento_id: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    description: 'Enlace al documento',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  documento_enlace: string;

  @ApiProperty({
    example: 1,
    description: 'Documento ID - Gestor Documental',
  })
  @Column({ type: 'integer', nullable: true })
  documento_id: number;

  @Column({ default: true })
  activo: boolean;

  @Column({ name: 'contrato_general_id' })
  contrato_general_id: number;

  @ManyToOne(() => ContratoGeneral, (contrato) => contrato.documentos)
  @JoinColumn({ name: 'contrato_general_id' })
  contratoGeneral: ContratoGeneral;
}
