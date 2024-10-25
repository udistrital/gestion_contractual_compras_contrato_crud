import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ContratoGeneral } from '../../contrato-general/entities/contrato-general.entity';

@Entity('acta_inicio')
export class ActaInicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usuario_id', nullable: true })
  usuarioId: number;

  @Column({ name: 'user_legacy', length: 20, nullable: true })
  userLegacy: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fechaFin: Date;

  @ManyToOne(() => ContratoGeneral, (contratoGeneral) => contratoGeneral.id, { nullable: true })
  @Column({ name: 'contrato_general_id', nullable: true })
  contratoGeneralId: number;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({ name: 'fecha_modificacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaModificacion: Date;
}
