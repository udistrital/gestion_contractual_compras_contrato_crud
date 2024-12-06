import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { ContratoGeneral } from '../../contrato-general/entities/contrato-general.entity';

@Entity('ordenador-contrato')
export class OrdenadorContrato {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'tercero_id', type: 'integer' })
    terceroId: number;

    @Column({ name: 'ordenador_argo_id', type: 'integer' })
    ordenadorArgoId: number;

    @Column({ name: 'ordenador_sikarca_id', type: 'integer' })
    ordenadorSikarcaId: number;

    @Column({ type: 'varchar' })
    resolucion: string;

    @Column({ name: 'documento_identidad', type: 'varchar' })
    documentoIdentidad: string;

    @Column({ name: 'cargo_id', type: 'integer' })
    cargoId: number;

    @OneToOne(() => ContratoGeneral)
    @JoinColumn({ name: 'contrato_general_id' })
    contrato_general: ContratoGeneral;

    @Column()
    contrato_general_id: number;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_creacion: Date;

    @Column({ type: 'timestamp', nullable: true })
    fecha_modificacion: Date | null;
}
