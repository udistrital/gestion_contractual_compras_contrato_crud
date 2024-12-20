import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ContratoGeneral } from '../../contrato-general/entities/contrato-general.entity';

@Entity('lugar_ejecucion')
export class LugarEjecucion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pais_id', type: 'integer' })
  pais_id: number;

  @Column({ name: 'ciudad_id', type: 'integer' })
  ciudad_id: number;

  @Column({ name: 'municipio_id', type: 'integer' })
  municipio_id: number;

  @Column({ name: 'dependencia_id', type: 'integer' })
  dependencia_id: number;

  @Column({ name: 'sede_id', type: 'integer' })
  sede_id: number;

  @Column({ type: 'varchar', length: 120 })
  direccion: string;

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
