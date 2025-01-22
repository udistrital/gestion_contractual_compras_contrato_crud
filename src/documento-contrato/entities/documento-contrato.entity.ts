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
    description: 'ID del contrato general asociado',
  })
  @Column({ name: 'contrato_general_id', type: 'integer' })
  contrato_general_id: number;

  @ManyToOne(() => ContratoGeneral, (contrato) => contrato.documentos)
  @JoinColumn({ name: 'contrato_general_id' })
  contrato_general: ContratoGeneral;

  @ApiProperty({
    example: 1,
    description: 'ID del tipo de documento (Parámetros CRUD)',
  })
  @Column({ type: 'integer', nullable: true })
  tipo_documento_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario quien registra el documento',
  })
  @Column({ type: 'integer', nullable: true })
  usuario_id: number;

  @ApiProperty({
    example: 'ROL',
    description: 'Rol del usuario quien registra el documento',
  })
  @Column({ type: 'varchar', length: 40, nullable: true })
  usuario_rol: string;

  @ApiProperty({
    example: 1,
    description: 'ID del documento en el gestor documental',
  })
  @Column({ type: 'integer', nullable: true })
  documento_id: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    description: 'Enlace único al documento',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  documento_enlace: string;

  @ApiProperty({
    example: true,
    description: 'Indicador documento actual',
  })
  @Column({ type: 'boolean', nullable: true })
  actual: boolean;

  @ApiProperty({
    example: true,
    description: 'Estado del documento (activo o inactivo)',
  })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Fecha de creación del documento',
  })
  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_creacion: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Fecha de última modificación del documento',
  })
  @Column({
    name: 'fecha_modificacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  fecha_modificacion: Date;
}
