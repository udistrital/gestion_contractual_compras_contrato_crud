import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ContratoGeneral } from '../../contrato-general/entities/contrato-general.entity';

@Entity('estado_contrato')
export class EstadoContrato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'contrato_general_id' })
  contratoGeneralId: number;

  @Column({ type: 'integer' })
  usuario_id: number;

  @Column({ type: 'integer', nullable: true })
  estado_parametro_id: number;

  @Column({ type: 'varchar', length: 250 })
  motivo: string;

  @Column({ type: 'timestamp' })
  fecha_ejecucion_estado: Date;

  @Column({ type: 'boolean' })
  activo: boolean;

  @Column({ type: 'timestamp', nullable: true })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_modificacion: Date | null;

  @ManyToOne(
    () => ContratoGeneral,
    (contratoGeneral) => contratoGeneral.estados,
  )
  @JoinColumn({ name: 'contrato_general_id' })
  contrato_general_id: ContratoGeneral;
}
