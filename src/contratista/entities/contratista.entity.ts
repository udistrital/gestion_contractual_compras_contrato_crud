import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ContratoGeneral } from '../../contrato-general/entities/contrato-general.entity';

@Entity('contratista')
export class Contratista {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  numero_documento: string;

  @Column()
  tipo_persona_id: number;

  @Column({ type: 'integer', nullable: true })
  clase_contratista_id: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ nullable: true })
  fecha_modificacion: Date;

  @OneToOne(() => ContratoGeneral)
  @JoinColumn({ name: 'contrato_general_id' })
  contrato_general: ContratoGeneral;

  @Column()
  contrato_general_id: number;
}
