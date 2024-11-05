import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { ContratoGeneral } from '../../contrato-general/entities/contrato-general.entity';

@Entity('acta_inicio')
export class ActaInicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usuario_id', nullable: true })
  usuarioId: number;

  @Column({ name: 'usuario_legacy', length: 20, nullable: true })
  usuarioLegacy: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fechaFin: Date;

  @RelationId((acta: ActaInicio) => acta.contratoGeneral)
  @Column({ name: 'contrato_general_id' })
  contratoGeneralId: number;

  @ManyToOne(() => ContratoGeneral)
  @JoinColumn({ name: 'contrato_general_id' })
  contratoGeneral: ContratoGeneral;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @Column({
    name: 'fecha_modificacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaModificacion: Date;
}
