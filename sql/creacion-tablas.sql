-- Crear extensión UUID si no existe
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla principal de contratos
CREATE TABLE contrato_general (
    id SERIAL PRIMARY KEY,
    tipo_compromiso_id INTEGER,
    tipo_contrato_id INTEGER,
    perfil_contratista_id INTEGER,
    fecha_suscripcion_estudios DATE,
    aplica_poliza BOOLEAN,
    modalidad_seleccion_id INTEGER,
    tipo_control_id INTEGER,
    tipologia_especifica_id INTEGER,
    regimen_contratacion_id INTEGER,
    procedimiento_id INTEGER,
    plazo_ejecucion INTEGER,
    unidad_ejecutora_id INTEGER,
    tipo_moneda_id INTEGER,
    valor_pesos NUMERIC(16,2),
    tipo_gasto_id INTEGER,
    origen_recursos_id INTEGER,
    origen_presupuesto_id INTEGER,
    tema_gasto_inversion_id INTEGER,
    valor_contrato_me NUMERIC(16,3),
    valor_tasa_cambio NUMERIC(16,10),
    medio_pago_id INTEGER,
    clausula_registro_presupuestal BOOLEAN,
    modo_pago VARCHAR,
    objeto VARCHAR,
    justificacion VARCHAR,
    condiciones VARCHAR,
    observaciones VARCHAR(500),
    vigencia VARCHAR(4),
    consecutivo_elaboracion VARCHAR(50),
    fecha_inicial DATE,
    fecha_final DATE,
    usuario_legado VARCHAR(15),
    numero_contrato VARCHAR(50),
    unidad_ejecucion_id INTEGER,
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW() NOT NULL,
    fecha_modificacion TIMESTAMP DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE contrato_general IS 'Tabla principal que almacena la información básica de todos los contratos';
COMMENT ON COLUMN contrato_general.tipo_compromiso_id IS 'Identificador del tipo de compromiso en Parámetros CRUD';
COMMENT ON COLUMN contrato_general.tipo_contrato_id IS 'Identificador del tipo de compromiso en Parámetros CRUD';
COMMENT ON COLUMN contrato_general.perfil_contratista_id IS 'Identificador del perfil del contratista en Parámetros CRUD';
COMMENT ON COLUMN contrato_general.valor_pesos IS 'Valor del contrato en pesos colombianos';
COMMENT ON COLUMN contrato_general.valor_contrato_me IS 'Valor del contrato en moneda extranjera';
COMMENT ON COLUMN contrato_general.plazo_ejecucion IS 'Duración del contrato';

-- Tabla de documentos del contrato
CREATE TABLE documento_contrato (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tipo_documento_id INTEGER,
    contrato_general_id INTEGER NOT NULL REFERENCES contrato_general(id),
    documento_enlace VARCHAR(50),
    documento_id INTEGER,
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW() NOT NULL,
    fecha_modificacion TIMESTAMP DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE documento_contrato IS 'Almacena los documentos asociados a cada contrato';
COMMENT ON COLUMN documento_contrato.tipo_documento_id IS 'Tipo de documento según Parámetros CRUD';

-- Tabla de estados del contrato
CREATE TABLE estado_contrato (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    motivo VARCHAR(250),
    contrato_general_id INTEGER NOT NULL REFERENCES contrato_general(id),
    estado_parametro_id INTEGER,
    estado_interno_parametro_id INTEGER,
    actual BOOLEAN NO NULL,
    usuario_rol VARCHAR(40),
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW() NOT NULL,
    fecha_modificacion TIMESTAMP DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE estado_contrato IS 'Registra el historial de estados por los que pasa un contrato';
COMMENT ON COLUMN estado_contrato.motivo IS 'Razón del cambio de estado del contrato';

-- Tabla de solicitantes
CREATE TABLE solicitante (
    id SERIAL PRIMARY KEY,
    dependencia_solicitante_id INTEGER NOT NULL,
    sede_solicitante_id INTEGER NOT NULL,
    contrato_general_id INTEGER NOT NULL UNIQUE REFERENCES contrato_general(id),
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW() NOT NULL,
    fecha_modificacion TIMESTAMP
);

COMMENT ON TABLE solicitante IS 'Información de la dependencia o área que solicita el contrato';
COMMENT ON COLUMN solicitante.dependencia_solicitante_id IS 'Identificador de la dependencia que solicita el contrato';
COMMENT ON COLUMN solicitante.sede_solicitante_id IS 'Identificador de la sede donde se origina la solicitud';

-- Tabla de lugares de ejecución
CREATE TABLE lugar_ejecucion (
    id SERIAL PRIMARY KEY,
    pais_id INTEGER NOT NULL,
    ciudad_id INTEGER NOT NULL,
    municipio_id INTEGER NOT NULL,
    dependencia_id INTEGER NOT NULL,
    sede_id INTEGER NOT NULL,
    direccion VARCHAR(120) NOT NULL,
    contrato_general_id INTEGER UNIQUE REFERENCES contrato_general(id),
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW() NOT NULL,
    fecha_modificacion TIMESTAMP
);

COMMENT ON TABLE lugar_ejecucion IS 'Especifica la ubicación donde se ejecutará el contrato';
COMMENT ON COLUMN lugar_ejecucion.direccion IS 'Dirección física donde se ejecutará el contrato';

-- Tabla de supervisores de contrato
CREATE TABLE supervisor_contrato (
    id SERIAL PRIMARY KEY,
    contrato_general_id INTEGER NOT NULL REFERENCES contrato_general(id),
    supervisor_id INTEGER NOT NULL,
    sede_legado VARCHAR,
    dependencia_legado VARCHAR,
    cargo_legado VARCHAR,
    cargo_id INTEGER NOT NULL,
    documento INTEGER NOT NULL,
    digito_verificacion INTEGER,
    sede_id INTEGER NOT NULL,
    dependencia_id INTEGER NOT NULL,
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW() NOT NULL,
    fecha_modificacion TIMESTAMP
);

COMMENT ON TABLE supervisor_contrato IS 'Registro de supervisores asignados a cada contrato';
COMMENT ON COLUMN supervisor_contrato.supervisor_id IS 'Identificador del funcionario que ejerce como supervisor';

-- Tabla de CDP (Certificado de Disponibilidad Presupuestal)
CREATE TABLE cdp (
    id SERIAL PRIMARY KEY,
    numero_cdp_id INTEGER NOT NULL,
    fecha_registro DATE NOT NULL,
    vigencia_cdp INTEGER NOT NULL,
    contrato_general_id INTEGER NOT NULL REFERENCES contrato_general(id),
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW() NOT NULL,
    fecha_modificacion TIMESTAMP DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE cdp IS 'Certificados de Disponibilidad Presupuestal asociados a los contratos';
COMMENT ON COLUMN cdp.numero_cdp_id IS 'Número único del CDP';
COMMENT ON COLUMN cdp.vigencia_cdp IS 'Año de vigencia del CDP';

-- Tabla de registros presupuestales
CREATE TABLE registro_presupuestal (
    id SERIAL PRIMARY KEY,
    numero_disponibilidad INTEGER,
    fecha_registro DATE,
    vigencia_cdp INTEGER,
    cdp_id INTEGER NOT NULL UNIQUE REFERENCES cdp(id),
    activo BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL,
    fecha_modificacion TIMESTAMP NOT NULL
);

COMMENT ON TABLE registro_presupuestal IS 'Registros presupuestales asociados a los CDP';
COMMENT ON COLUMN registro_presupuestal.numero_disponibilidad IS 'Número de disponibilidad presupuestal';
COMMENT ON COLUMN registro_presupuestal.vigencia_cdp IS 'Año de vigencia del registro presupuestal';

-- Tabla de contratos de arrendamiento
CREATE TABLE contrato_arrendamiento (
    id SERIAL PRIMARY KEY,
    destinacion VARCHAR(255),
    plazo_pago_mensual INTEGER,
    reajuste VARCHAR(255),
    plazo_administracion INTEGER,
    valor_administracion NUMERIC(16,2),
    plazo_entrega INTEGER,
    valor_arrendamiento NUMERIC(16,2),
    contrato_general_id INTEGER NOT NULL UNIQUE REFERENCES contrato_general(id),
    activo BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL,
    fecha_modificacion TIMESTAMP NOT NULL
);

COMMENT ON TABLE contrato_arrendamiento IS 'Información específica para contratos de tipo arrendamiento';
COMMENT ON COLUMN contrato_arrendamiento.destinacion IS 'Uso previsto del inmueble arrendado';
COMMENT ON COLUMN contrato_arrendamiento.plazo_pago_mensual IS 'Día del mes establecido para el pago';
COMMENT ON COLUMN contrato_arrendamiento.valor_arrendamiento IS 'Valor mensual del arrendamiento';

-- Tabla de contratistas
CREATE TABLE contratista (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    numero_documento VARCHAR(20) NOT NULL,
    tipo_persona_id INTEGER NOT NULL,
    contrato_general_id INTEGER UNIQUE REFERENCES contrato_general(id),
    clase_contratista_id INTEGER,
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW() NOT NULL,
    fecha_modificacion TIMESTAMP
);

COMMENT ON TABLE contratista IS 'Información de los contratistas';
COMMENT ON COLUMN contratista.numero_documento IS 'Número de identificación del contratista';
COMMENT ON COLUMN contratista.tipo_persona_id IS 'Tipo de persona (natural o jurídica)';

-- Tabla de convenios
CREATE TABLE convenio (
    id SERIAL PRIMARY KEY,
    vigencia INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    tipo_convenio_id INTEGER NOT NULL,
    contrato_general_id INTEGER NOT NULL UNIQUE REFERENCES contrato_general(id),
    activo BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL,
    fecha_modificacion TIMESTAMP NOT NULL
);

COMMENT ON TABLE convenio IS 'Información específica para contratos de tipo convenio';
COMMENT ON COLUMN convenio.vigencia IS 'Año de vigencia del convenio';
COMMENT ON COLUMN convenio.tipo_convenio_id IS 'Tipo de convenio (marco, específico, etc.)';

-- Tabla de especificaciones técnicas
CREATE TABLE especificacion_tecnica (
    id SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL,
    cantidad INTEGER NOT NULL,
    valor_unitario NUMERIC(10,2) NOT NULL,
    valor_total NUMERIC(15,2) NOT NULL,
    contrato_general_id INTEGER REFERENCES contrato_general(id),
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW() NOT NULL,
    fecha_modificacion TIMESTAMP DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE especificacion_tecnica IS 'Detalles técnicos y económicos de los items del contrato';
COMMENT ON COLUMN especificacion_tecnica.descripcion IS 'Descripción detallada del item o servicio';
COMMENT ON COLUMN especificacion_tecnica.valor_total IS 'Valor total del item (cantidad * valor unitario)';

-- Tabla de actas de inicio
CREATE TABLE acta_inicio (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER,
    usuario_legado VARCHAR(20),
    descripcion VARCHAR(255),
    fecha_inicio DATE,
    fecha_fin DATE,
    contrato_general_id INTEGER NOT NULL REFERENCES contrato_general(id),
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW() NOT NULL,
    fecha_modificacion TIMESTAMP DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE acta_inicio IS 'Registro de las actas de inicio de los contratos';
COMMENT ON COLUMN acta_inicio.fecha_inicio IS 'Fecha de inicio de ejecución del contrato';
COMMENT ON COLUMN acta_inicio.fecha_fin IS 'Fecha prevista de finalización del contrato';

-- Tabla de ordenadores de contrato
CREATE TABLE ordenador_contrato (
    id SERIAL PRIMARY KEY,
    tercero_id INTEGER NOT NULL,
    ordenador_argo_id INTEGER NOT NULL,
    ordenador_sikarca_id INTEGER NOT NULL,
    resolucion VARCHAR NOT NULL,
    documento_identidad VARCHAR NOT NULL,
    cargo_id INTEGER NOT NULL,
    contrato_general_id INTEGER NOT NULL UNIQUE REFERENCES contrato_general(id),
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW() NOT NULL,
    fecha_modificacion TIMESTAMP
);

COMMENT ON TABLE ordenador_contrato IS 'Información de los ordenadores de gasto para cada contrato';
COMMENT ON COLUMN ordenador_contrato.tercero_id IS 'Identificador del tercero que actúa como ordenador';
COMMENT ON COLUMN ordenador_contrato.resolucion IS 'Número de resolución que autoriza al ordenador';

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_contrato_general_tipo_contrato ON contrato_general(tipo_contrato_id);
CREATE INDEX idx_documento_contrato_contrato ON documento_contrato(contrato_general_id);
CREATE INDEX idx_estado_contrato_contrato ON estado_contrato(contrato_general_id);
CREATE INDEX idx_supervisor_contrato_supervisor ON supervisor_contrato(supervisor_id);
CREATE INDEX idx_cdp_contrato ON cdp(contrato_general_id);

COMMENT ON INDEX idx_contrato_general_tipo_contrato IS 'Índice para optimizar búsquedas por tipo de contrato';
COMMENT ON INDEX idx_documento_contrato_contrato IS 'Índice para optimizar la relación entre documentos y contratos';
COMMENT ON INDEX idx_estado_contrato_contrato IS 'Índice para optimizar consultas de estado de contratos';
COMMENT ON INDEX idx_supervisor_contrato_supervisor IS 'Índice para optimizar búsquedas por supervisor';
COMMENT ON INDEX idx_cdp_contrato IS 'Índice para optimizar la relación entre CDP y contratos';
