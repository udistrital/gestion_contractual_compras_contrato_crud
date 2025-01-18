import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ContratoGeneral } from '../../contrato-general/entities/contrato-general.entity';

@Entity('disponibilidad_presupuestal')
export class Cdp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero_cdp_id: number;

  @Column({ type: 'date' })
  fecha_registro: Date;

  @Column()
  vigencia_cdp: number;

  @ManyToOne(() => ContratoGeneral, (contratoGeneral) => contratoGeneral.cdps)
  @JoinColumn({ name: 'contrato_general_id' })
  contrato_general: ContratoGeneral;

  @Column({ name: 'contrato_general_id' })
  contrato_general_id: number;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_modificacion: Date;
}
