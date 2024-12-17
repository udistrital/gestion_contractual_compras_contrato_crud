import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { DocumentoContrato } from '../../documento-contrato/entities/documento-contrato.entity';
import { EstadoContrato } from '../../estado-contrato/entities/estado-contrato.entity';
import { Cdp } from '../../cdp/entities/cdp.entity';
import { LugarEjecucion } from '../../lugar-ejecucion/entities/lugar-ejecucion.entity';
import { Contratista } from '../../contratista/entities/contratista.entity';
import { OrdenadorContrato } from 'src/ordenador-contrato/entities/ordenador-contrato.entity';

@Entity('contrato_general')
export class ContratoGeneral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_compromiso_id', nullable: true })
  tipo_compromiso_id: number;

  @Column({ name: 'tipo_contrato_id', nullable: true })
  tipo_contrato_id: number;

  @Column({ name: 'perfil_contratista_id', nullable: true })
  perfil_contratista_id: number;

  @Column({ name: 'fecha_suscripcion_estudios', type: 'date', nullable: true })
  fecha_suscripcion_estudios: Date;

  @Column({ name: 'aplica_poliza', nullable: true })
  aplica_poliza: boolean;

  @Column({ name: 'ordenador_id', nullable: true })
  ordenador_id: number;

  @Column({ name: 'modalidad_seleccion_id', nullable: true })
  modalidad_seleccion_id: number;

  @Column({ name: 'tipologia_especifica_id', nullable: true })
  tipologia_especifica_id: number;

  @Column({ name: 'regimen_contratacion_id', nullable: true })
  regimen_contratacion_id: number;

  @Column({ name: 'procedimiento_id', nullable: true })
  procedimiento_id: number;

  @Column({ name: 'plazo_ejecucion', nullable: true })
  plazo_ejecucion: number;

  @Column({ name: 'unidad_ejecucion_id', nullable: true })
  unidad_ejecucion_id: number;

  @Column({ name: 'numero_constancia', nullable: true })
  numero_constancia: number;

  @Column({ name: 'clase_contratista_id', nullable: true })
  clase_contratista_id: number;

  @Column({ name: 'tipo_moneda_id', nullable: true })
  tipo_moneda_id: number;

  @Column({
    name: 'valor_pesos',
    type: 'numeric',
    precision: 16,
    scale: 2,
    nullable: true,
  })
  valor_pesos: number;

  @Column({ name: 'tipo_gasto_id', nullable: true })
  tipo_gasto_id: number;

  @Column({ name: 'origen_recursos_id', nullable: true })
  origen_recursos_id: number;

  @Column({ name: 'origen_presupuestos_id', nullable: true })
  origen_presupuestos_id: number;

  @Column({ name: 'tema_gasto_inversion_id', nullable: true })
  tema_gasto_inversion_id: number;

  @Column({
    name: 'valor_contrato_me',
    type: 'numeric',
    precision: 16,
    scale: 3,
    nullable: true,
  })
  valor_contrato_me: number;

  @Column({
    name: 'valor_tasa_cambio',
    type: 'numeric',
    precision: 16,
    scale: 10,
    nullable: true,
  })
  valor_tasa_cambio: number;

  @Column({ name: 'medio_pago_id', nullable: true })
  medio_pago_id: number;

  @Column({ name: 'clausula_registro_presupuestal', nullable: true })
  clausula_registro_presupuestal: boolean;

  @Column({ name: 'modo_pago', nullable: true })
  modo_pago: string;

  @Column({ length: 500, nullable: true })
  observaciones: string;

  @Column({ length: 4, nullable: true })
  vigencia: string;

  @Column({ name: 'consecutivo_elaboracion', length: 50, nullable: true })
  consecutivo_elaboracion: string;

  @Column({ name: 'fecha_inicial', type: 'date', nullable: true })
  fecha_inicial: Date;

  @Column({ name: 'fecha_final', type: 'date', nullable: true })
  fecha_final: Date;

  @Column({ name: 'usuario_legado', length: 15, nullable: true })
  usuario_legado: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ name: 'fecha_creacion', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ name: 'fecha_modificacion', default: () => 'CURRENT_TIMESTAMP' })
  fecha_modificacion: Date;

  @OneToMany(
    () => DocumentoContrato,
    (documentoContrato) => documentoContrato.contrato_general,
  )
  documentos: DocumentoContrato[];

  @OneToMany(
    () => EstadoContrato,
    (estadoContrato) => estadoContrato.contrato_general,
  )
  estados: EstadoContrato[];

  @OneToMany(() => Cdp, (cdp) => cdp.contrato_general_id)
  cdps: Cdp[];

  /*
  @OneToOne(() => Solicitante, solicitante => solicitante.contratoGeneral)
  solicitante: Solicitante;

  @OneToMany(() => SupervisorContrato, supervisor => supervisor.contratoGeneral)
  supervisores: SupervisorContrato[];


  @OneToOne(() => ContratoArrendamiento, arrendamiento => arrendamiento.contratoGeneral)
  contratoArrendamiento: ContratoArrendamiento;

  @OneToOne(() => Convenio, (convenio) => convenio.contratoGeneral)
  convenio: Convenio;
   */

  @OneToOne(
    () => LugarEjecucion,
    (lugarEjecucion) => lugarEjecucion.contrato_general_id,
  )
  lugar_ejecucion: LugarEjecucion;

  @OneToOne(() => Contratista, (contratista) => contratista.contrato_general)
  contratista: Contratista;

  @OneToOne(
    () => OrdenadorContrato,
    (ordenador) => ordenador.contrato_general_id,
  )
  ordenador: OrdenadorContrato;

  @Column({ name: 'unidad_ejecutora_id', nullable: true })
  unidad_ejecutora_id: number;
}
