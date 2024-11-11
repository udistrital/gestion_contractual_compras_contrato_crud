import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('especificacion_tecnica')
export class EspecificacionTecnica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion: string;

  @Column({ name: 'cantidad', type: 'numeric', precision: 10, scale: 2 })
  cantidad: number;

  @Column('decimal', { name: 'valor_unitario', precision: 10, scale: 2 })
  valorUnitario: number;
  
  @Column('decimal', { name: 'valor_total', precision: 15, scale: 2 })
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
