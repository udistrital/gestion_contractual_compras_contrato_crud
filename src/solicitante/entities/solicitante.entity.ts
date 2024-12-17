import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ContratoGeneral } from '../../contrato-general/entities/contrato-general.entity';

@Entity('solicitante')
export class SolicitanteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'dependencia_solicitante_id', type: 'integer' })
  dependencia_solicitante_id: number;

  @Column({ name: 'sede_solicitante_id', type: 'integer' })
  sede_solicitante_id: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_modificacion: Date | null;

  @OneToOne(() => ContratoGeneral)
  @JoinColumn({ name: 'contrato_general_id' })
  contrato_general: ContratoGeneral;

  @Column()
  contrato_general_id: number;
}
