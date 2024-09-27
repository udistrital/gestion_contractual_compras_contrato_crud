import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {DocumentoContrato} from "../../documento-contrato/entities/documento-contrato.entity";

@Entity('contrato_general')
export class ContratoGeneral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_compromiso_id' })
  tipoCompromisoId: number;

  @Column({ name: 'tipo_contrato_id' })
  tipoContratoId: number;

  @Column({ name: 'perfil_contratista_id' })
  perfilContratistaId: number;

  @Column({ name: 'fecha_suscripcion_estudios', type: 'date' })
  fechaSuscripcionEstudios: Date;

  @Column({ name: 'aplica_poliza' })
  aplicaPoliza: boolean;

  @Column({ name: 'ordenador_id' })
  ordenadorId: number;

  @Column({ name: 'modalidad_seleccion_id' })
  modalidadSeleccionId: number;

  @Column({ name: 'tipologia_especifica_id' })
  tipologiaEspecificaId: number;

  @Column({ name: 'regimen_contratacion_id' })
  regimenContratacionId: number;

  @Column({ name: 'procedimiento_id' })
  procedimientoId: number;

  @Column({ name: 'plazo_ejecucion' })
  plazoEjecucion: number;

  @Column({ name: 'unidad_ejecutora_id' })
  unidadEjecutoraId: number;

  @Column({ name: 'numero_constancia' })
  numeroConstancia: number;

  @Column({ name: 'clase_contratista_id' })
  claseContratistaId: number;

  @Column({ name: 'tipo_moneda_id' })
  tipoMonedaId: number;

  @Column({ name: 'valor_pesos', type: 'numeric', precision: 16, scale: 2 })
  valorPesos: number;

  @Column({ name: 'tipo_gasto_id' })
  tipoGastoId: number;

  @Column({ name: 'origen_recursos_id' })
  origenRecursosId: number;

  @Column({ name: 'origen_presupuestos_id' })
  origenPresupuestosId: number;

  @Column({ name: 'tema_gasto_inversion_id' })
  temaGastoInversionId: number;

  @Column({
    name: 'valor_contrato_me',
    type: 'numeric',
    precision: 16,
    scale: 3,
  })
  valorContratoMe: number;

  @Column({
    name: 'valor_tasa_cambio',
    type: 'numeric',
    precision: 16,
    scale: 10,
  })
  valorTasaCambio: number;

  @Column({ name: 'medio_pogo_id' })
  medioPogoId: number;

  @Column({ name: 'clausula_registro_presupuestal' })
  clausulaRegistroPresupuestal: boolean;

  @Column({ name: 'modo_pago' })
  modoPago: string;

  @Column({ length: 500 })
  observaciones: string;

  @Column({ length: 4 })
  vigencia: string;

  @Column({ name: 'consecutivo_elaboracion', length: 50 })
  consecutivoElaboracion: string;

  @Column({ name: 'fecha_inicial', type: 'date' })
  fechaInicial: Date;

  @Column({ name: 'fecha_final', type: 'date' })
  fechaFinal: Date;

  @Column({ name: 'usuario_legacy', length: 15 })
  usuarioLegacy: string;

  @Column()
  activo: boolean;

  @Column({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Column({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @OneToMany(() => DocumentoContrato, documentoContrato => documentoContrato.contrato)
  documentosContrato: DocumentoContrato[];
}
