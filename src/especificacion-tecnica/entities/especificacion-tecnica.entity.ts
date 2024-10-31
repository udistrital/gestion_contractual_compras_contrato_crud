import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('especificacion_tecnica')
export class EspecificacionTecnica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'item' })
  item: string;

  @Column({ name: 'especificacion' })
  especificacion: string;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion: string;

  @Column({ name: 'cantidad', type: 'numeric', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ name: 'valor_unitario', type: 'numeric', precision: 16, scale: 2 })
  valorUnitario: number;

  @Column({ name: 'valor_total', type: 'numeric', precision: 16, scale: 2 })
  valorTotal: number;

  @Column({ name: 'contrato_general_id', nullable: true })
  contratoGeneralId: number;

  @Column({ default: true })
  activo: boolean;

  @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({ name: 'fecha_modificacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  fechaModificacion: Date;
}
