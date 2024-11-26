import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContratoGeneral } from '../../contrato-general/entities/contrato-general.entity';

@Entity()
export class DocumentoContrato {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', nullable: true })
  tipo_documento_id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  documento_enlace: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ name: 'contrato_general_id' })
  contrato_general_id: number;

  @ManyToOne(() => ContratoGeneral, (contrato) => contrato.documentos)
  @JoinColumn({ name: 'contrato_general_id' })
  contratoGeneral: ContratoGeneral;
}
