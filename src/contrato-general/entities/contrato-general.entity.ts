import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DocumentoContrato } from '../../documento-contrato/entities/documento-contrato.entity';
import { EstadoContrato } from '../../estado-contrato/entities/estado-contrato.entity';
import { Cdp } from '../../cdp/entities/cdp.entity';

@Entity('contrato_general')
export class ContratoGeneral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_compromiso_id', nullable: true })
  tipoCompromisoId: number;

  @Column({ name: 'tipo_contrato_id', nullable: true })
  tipoContratoId: number;

  @Column({ name: 'perfil_contratista_id', nullable: true })
  perfilContratistaId: number;

  @Column({ name: 'fecha_suscripcion_estudios', type: 'date', nullable: true })
  fechaSuscripcionEstudios: Date;

  @Column({ name: 'aplica_poliza', nullable: true })
  aplicaPoliza: boolean;

  @Column({ name: 'ordenador_id', nullable: true })
  ordenadorId: number;

  @Column({ name: 'modalidad_seleccion_id', nullable: true })
  modalidadSeleccionId: number;

  @Column({ name: 'tipologia_especifica_id', nullable: true })
  tipologiaEspecificaId: number;

  @Column({ name: 'regimen_contratacion_id', nullable: true })
  regimenContratacionId: number;

  @Column({ name: 'procedimiento_id', nullable: true })
  procedimientoId: number;

  @Column({ name: 'plazo_ejecucion', nullable: true })
  plazoEjecucion: number;

  @Column({ name: 'unidad_ejecutora_id', nullable: true })
  unidadEjecutoraId: number;

  @Column({ name: 'numero_constancia', nullable: true })
  numeroConstancia: number;

  @Column({ name: 'clase_contratista_id', nullable: true })
  claseContratistaId: number;

  @Column({ name: 'tipo_moneda_id', nullable: true })
  tipoMonedaId: number;

  @Column({
    name: 'valor_pesos',
    type: 'numeric',
    precision: 16,
    scale: 2,
    nullable: true,
  })
  valorPesos: number;

  @Column({ name: 'tipo_gasto_id', nullable: true })
  tipoGastoId: number;

  @Column({ name: 'origen_recursos_id', nullable: true })
  origenRecursosId: number;

  @Column({ name: 'origen_presupuestos_id', nullable: true })
  origenPresupuestosId: number;

  @Column({ name: 'tema_gasto_inversion_id', nullable: true })
  temaGastoInversionId: number;

  @Column({
    name: 'valor_contrato_me',
    type: 'numeric',
    precision: 16,
    scale: 3,
    nullable: true,
  })
  valorContratoMe: number;

  @Column({
    name: 'valor_tasa_cambio',
    type: 'numeric',
    precision: 16,
    scale: 10,
    nullable: true,
  })
  valorTasaCambio: number;

  @Column({ name: 'medio_pogo_id', nullable: true })
  medioPogoId: number;

  @Column({ name: 'clausula_registro_presupuestal', nullable: true })
  clausulaRegistroPresupuestal: boolean;

  @Column({ name: 'modo_pago', nullable: true })
  modoPago: string;

  @Column({ length: 500, nullable: true })
  observaciones: string;

  @Column({ length: 4, nullable: true })
  vigencia: string;

  @Column({ name: 'consecutivo_elaboracion', length: 50, nullable: true })
  consecutivoElaboracion: string;

  @Column({ name: 'fecha_inicial', type: 'date', nullable: true })
  fechaInicial: Date;

  @Column({ name: 'fecha_final', type: 'date', nullable: true })
  fechaFinal: Date;

  @Column({ name: 'usuario_legacy', length: 15, nullable: true })
  usuarioLegacy: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ name: 'fecha_creacion', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({ name: 'fecha_modificacion', default: () => 'CURRENT_TIMESTAMP' })
  fechaModificacion: Date;

  @OneToMany(
    () => DocumentoContrato,
    (documentoContrato) => documentoContrato.contrato_general_id,
  )
  documentosContrato: DocumentoContrato[];

  @OneToMany(
    () => EstadoContrato,
    (estadoContrato) => estadoContrato.contrato_general_id,
  )
  estados: EstadoContrato[];

  @OneToMany(() => Cdp, (cdp) => cdp.contrato_general_id)
  cdps: Cdp[];
}
