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

  @Column({ type: 'integer' })
  pais_id: number;

  @Column({ type: 'integer' })
  ciudad_id: number;

  @Column({ type: 'integer' })
  municipio_id: number;

  @Column({ type: 'integer' })
  dependencia_id: number;

  @Column({ type: 'integer' })
  sede_id: number;

  @Column({ type: 'varchar', length: 120 })
  direccion: string;

  @Column({ type: 'boolean' })
  activo: boolean;

  @Column({ type: 'timestamp' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_modificacion: Date | null;

  @OneToOne(() => ContratoGeneral)
  @JoinColumn({ name: 'contrato_general_id' })
  contrato_general_id: ContratoGeneral;
}
