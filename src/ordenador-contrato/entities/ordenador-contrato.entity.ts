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

    @Column({ name: 'tercero_id', type: 'integer' })
    tercero_id: number;

    @Column({ name: 'ordenador_argo_id', type: 'integer' })
    ordenador_argo_id: number;

    @Column({ name: 'ordenador_sikarca_id', type: 'integer' })
    ordenador_sikarca_id: number;

    @Column({ name: 'resolucion', type: 'varchar' })
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

    @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_creacion: Date;

    @Column({ name: 'fecha_modificacion', type: 'timestamp', nullable: true })
    fecha_modificacion: Date | null;
}