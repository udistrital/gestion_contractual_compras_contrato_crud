import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('especificacion_tecnica')
export class EspecificacionTecnica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'descripcion', type: 'varchar', nullable: true })
  descripcion: string;

  @Column({ name: 'cantidad', type: 'integer' })
  cantidad: number;

  @Column('decimal', {
    name: 'valor_unitario',
    precision: 10,
    scale: 2,
    transformer: { from: (value) => Number(value), to: (value) => value },
  })
  valor_unitario: number;

  @Column('decimal', {
    name: 'valor_total',
    precision: 15,
    scale: 2,
    transformer: { from: (value) => Number(value), to: (value) => value },
  })
  valor_total: number;

  @Column({ name: 'contrato_general_id', nullable: true })
  contrato_general_id: number;

  @Column({ default: true })
  activo: boolean;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_creacion: Date;

  @Column({
    name: 'fecha_modificacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  fecha_modificacion: Date;
}
