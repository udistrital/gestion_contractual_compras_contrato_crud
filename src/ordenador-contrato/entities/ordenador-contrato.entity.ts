import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ContratoGeneral } from '../../contrato-general/entities/contrato-general.entity';

@Entity('ordenador_contrato')
export class OrdenadorContrato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tercero_id', type: 'integer', nullable: true })
  tercero_id: number;

  @Column({ name: 'ordenador_argo_id', type: 'integer' })
  ordenador_argo_id: number;

  @Column({ name: 'ordenador_sicapital_id', type: 'integer' })
  ordenador_sicapital_id: number;

  @Column({ name: 'resolucion', type: 'varchar', nullable: true })
  resolucion: string;

  @Column({ name: 'documento_identidad', type: 'varchar' })
  documento_identidad: string;

  @Column({ name: 'cargo_id', type: 'integer' })
  cargo_id: number;

  @OneToOne(() => ContratoGeneral)
  @JoinColumn({ name: 'contrato_general_id' })
  contrato_general: ContratoGeneral;

  @Column({ name: 'contrato_general_id' })
  contrato_general_id: number;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_creacion: Date;

  @Column({ name: 'fecha_modificacion', type: 'timestamp', nullable: true })
  fecha_modificacion: Date | null;
}
