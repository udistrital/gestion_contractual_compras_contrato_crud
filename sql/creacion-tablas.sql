DO $$ 
BEGIN

IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contrato_general') THEN
    CREATE TABLE contrato_general (
        id SERIAL PRIMARY KEY,                                    -- Identificador único del contrato general
        tipo_contratacion_id INTEGER NOT NULL,                   -- Tipo de contratación
        tipo_contrato_id INTEGER NOT NULL,                       -- Tipo de contrato
        fecha_suscripcion_estudios DATE NOT NULL,                -- Fecha de suscripción de estudios
        aplica_poliza BOOLEAN NOT NULL,                          -- Indica si aplica póliza
        ordenador_id INTEGER NOT NULL,                           -- Identificador del ordenador
        modalidad_id INTEGER NOT NULL,                           -- Modalidad del contrato
        tipologia_especifica_id INTEGER NOT NULL,                -- Tipología específica
        regimen_contratacion_id INTEGER NOT NULL,                -- Régimen de contratación
        procedimiento_id INTEGER NOT NULL,                       -- Identificador del procedimiento
        plazo_ejecucion INTEGER NOT NULL,                        -- Plazo de ejecución
        fecha_proyeccion_id INTEGER NOT NULL,                    -- Fecha de proyección
        numero_constancia INTEGER NOT NULL,                      -- Número de constancia
        clase_constancia_id INTEGER NOT NULL,                    -- Clase de constancia
        valor_acumulados FLOAT NOT NULL,                         -- Valor acumulado
        tipo_smlmv_id INTEGER NOT NULL,                         -- Tipo de SMLMV
        valor_pesos NUMERIC(16,2) NOT NULL,                      -- Valor en pesos
        origen_recursos_id INTEGER NOT NULL,                     -- Origen de los recursos
        origen_presupuesto_id INTEGER NOT NULL,                  -- Origen del presupuesto
        forma_pago_inversion_id INTEGER NOT NULL,                -- Forma de pago inversión
        valor_contrato_me NUMERIC(16,3) NOT NULL,                -- Valor del contrato en moneda extranjera
        valor_tasa_cambio NUMERIC(16,10) NOT NULL,               -- Valor de la tasa de cambio
        modelo_pago_id INTEGER NOT NULL,                         -- Modelo de pago
        clausula_registro_presupuestal BOOLEAN NOT NULL,         -- Indica si tiene cláusula de registro presupuestal
        modo_pago VARCHAR NOT NULL,                            -- Modos de pago
        objeto_contrato VARCHAR NOT NULL,                      -- Objeto del contrato
        actividades VARCHAR NOT NULL,                          -- Actividades del contrato
        condiciones VARCHAR NOT NULL,                          -- Condiciones del contrato
        justificacion VARCHAR NOT NULL,                        -- Justificación del contrato
        observaciones VARCHAR(500) NOT NULL,                     -- Observaciones del contrato
        vigencia VARCHAR NOT NULL,                            -- Vigencia del contrato
        concepto_elaboracion VARCHAR(50) NOT NULL,               -- Concepto de elaboración
        fecha_inicial DATE NOT NULL,                             -- Fecha inicial del contrato
        fecha_final DATE NOT NULL,                               -- Fecha final del contrato
        usuario_legacy VARCHAR(15) NOT NULL,                     -- Usuario legacy
        activo BOOLEAN NOT NULL,                                 -- Indica si el registro está activo
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación del registro
        fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última modificación
    );
    
    COMMENT ON TABLE contrato_general IS 'Tabla principal que almacena la información general de los contratos';
    -- Los comentarios de las columnas de contrato_general se agregarán en un bloque separado
    -- debido a la cantidad de columnas, para mantener el script más organizado
END IF;

COMMENT ON COLUMN contrato_general.id IS 'Identificador único del contrato general';
COMMENT ON COLUMN contrato_general.tipo_contratacion_id IS 'Tipo de contratación';
COMMENT ON COLUMN contrato_general.tipo_contrato_id IS 'Tipo de contrato';
COMMENT ON COLUMN contrato_general.fecha_suscripcion_estudios IS 'Fecha de suscripción de estudios';
COMMENT ON COLUMN contrato_general.aplica_poliza IS 'Indica si aplica póliza';
COMMENT ON COLUMN contrato_general.ordenador_id IS 'Identificador del ordenador';
COMMENT ON COLUMN contrato_general.modalidad_id IS 'Modalidad del contrato';
COMMENT ON COLUMN contrato_general.tipologia_especifica_id IS 'Tipología específica';
COMMENT ON COLUMN contrato_general.regimen_contratacion_id IS 'Régimen de contratación';
COMMENT ON COLUMN contrato_general.procedimiento_id IS 'Identificador del procedimiento';
COMMENT ON COLUMN contrato_general.plazo_ejecucion IS 'Plazo de ejecución';
COMMENT ON COLUMN contrato_general.fecha_proyeccion_id IS 'Fecha de proyección';
COMMENT ON COLUMN contrato_general.numero_constancia IS 'Número de constancia';
COMMENT ON COLUMN contrato_general.clase_constancia_id IS 'Clase de constancia';
COMMENT ON COLUMN contrato_general.valor_acumulados IS 'Valor acumulado';
COMMENT ON COLUMN contrato_general.tipo_smlmv_id IS 'Tipo de SMLMV';
COMMENT ON COLUMN contrato_general.valor_pesos IS 'Valor en pesos';
COMMENT ON COLUMN contrato_general.origen_recursos_id IS 'Origen de los recursos';
COMMENT ON COLUMN contrato_general.origen_presupuesto_id IS 'Origen del presupuesto';
COMMENT ON COLUMN contrato_general.forma_pago_inversion_id IS 'Forma de pago inversión';
COMMENT ON COLUMN contrato_general.valor_contrato_me IS 'Valor del contrato en moneda extranjera';
COMMENT ON COLUMN contrato_general.valor_tasa_cambio IS 'Valor de la tasa de cambio';
COMMENT ON COLUMN contrato_general.modelo_pago_id IS 'Modelo de pago';
COMMENT ON COLUMN contrato_general.clausula_registro_presupuestal IS 'Indica si tiene cláusula de registro presupuestal';
COMMENT ON COLUMN contrato_general.modo_pago IS 'Modos de pago';
COMMENT ON COLUMN contrato_general.objeto_contrato IS 'Objeto del contrato';
COMMENT ON COLUMN contrato_general.actividades IS 'Actividades del contrato';
COMMENT ON COLUMN contrato_general.condiciones IS 'Condiciones del contrato';
COMMENT ON COLUMN contrato_general.justificacion IS 'Justificación del contrato';
COMMENT ON COLUMN contrato_general.observaciones IS 'Observaciones del contrato';
COMMENT ON COLUMN contrato_general.vigencia IS 'Vigencia del contrato';
COMMENT ON COLUMN contrato_general.concepto_elaboracion IS 'Concepto de elaboración';
COMMENT ON COLUMN contrato_general.fecha_inicial IS 'Fecha inicial del contrato';
COMMENT ON COLUMN contrato_general.fecha_final IS 'Fecha final del contrato';
COMMENT ON COLUMN contrato_general.usuario_legacy IS 'Usuario legacy';
COMMENT ON COLUMN contrato_general.activo IS 'Indica si el registro está activo';
COMMENT ON COLUMN contrato_general.fecha_creacion IS 'Fecha de creación del registro';
COMMENT ON COLUMN contrato_general.fecha_modificacion IS 'Fecha de última modificación';

IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'convenio') THEN
    CREATE TABLE convenio (
        id SERIAL PRIMARY KEY,                                    -- Identificador único del convenio
        monto_convenio_id INTEGER NOT NULL,                      -- Identificador del monto del convenio
        tipo_convenio_id INTEGER NOT NULL,                       -- Tipo de convenio
        contrato_general_id INTEGER,                             -- Referencia al contrato general
        activo BOOLEAN NOT NULL,                                 -- Indica si el registro está activo
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación del registro
        fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última modificación
    );
    
    COMMENT ON TABLE convenio IS 'Tabla que almacena los convenios asociados a contratos';
    COMMENT ON COLUMN convenio.id IS 'Identificador único del convenio';
    COMMENT ON COLUMN convenio.monto_convenio_id IS 'Identificador del monto del convenio';
    COMMENT ON COLUMN convenio.tipo_convenio_id IS 'Tipo de convenio';
    COMMENT ON COLUMN convenio.contrato_general_id IS 'Referencia al contrato general';
    COMMENT ON COLUMN convenio.activo IS 'Indica si el registro está activo';
    COMMENT ON COLUMN convenio.fecha_creacion IS 'Fecha de creación del registro';
    COMMENT ON COLUMN convenio.fecha_modificacion IS 'Fecha de última modificación';
END IF;

IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contratista') THEN
    CREATE TABLE contratista (
        id SERIAL PRIMARY KEY,                                    -- Identificador único del contratista
        numero_documento VARCHAR(20) NOT NULL,                    -- Número de documento del contratista
        tipo_persona VARCHAR(15) NOT NULL,                       -- Tipo de persona (Natural/Jurídica)
        contrato_general_id INTEGER,                             -- Referencia al contrato general
        activo BOOLEAN NOT NULL,                                 -- Indica si el registro está activo
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación del registro
        fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última modificación
    );
    
    COMMENT ON TABLE contratista IS 'Tabla que almacena la información de los contratistas';
    COMMENT ON COLUMN contratista.id IS 'Identificador único del contratista';
    COMMENT ON COLUMN contratista.numero_documento IS 'Número de documento del contratista';
    COMMENT ON COLUMN contratista.tipo_persona IS 'Tipo de persona (Natural/Jurídica)';
    COMMENT ON COLUMN contratista.contrato_general_id IS 'Referencia al contrato general';
    COMMENT ON COLUMN contratista.activo IS 'Indica si el registro está activo';
    COMMENT ON COLUMN contratista.fecha_creacion IS 'Fecha de creación del registro';
    COMMENT ON COLUMN contratista.fecha_modificacion IS 'Fecha de última modificación';
END IF;

IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contrato_arrendamiento') THEN
    CREATE TABLE contrato_arrendamiento (
        id SERIAL PRIMARY KEY,                                    -- Identificador único del contrato de arrendamiento
        plazo_pago_mensual INTEGER NOT NULL,                     -- Plazo de pago mensual en días
        plazo_administracion INTEGER NOT NULL,                   -- Plazo de administración en días
        valor_administracion INTEGER NOT NULL,                   -- Valor de la administración
        plazo_entrega INTEGER NOT NULL,                         -- Plazo de entrega en días
        valor_arrendamiento INTEGER NOT NULL,                    -- Valor del arrendamiento
        contrato_general_id INTEGER,                             -- Referencia al contrato general
        activo BOOLEAN NOT NULL,                                 -- Indica si el registro está activo
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación del registro
        fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última modificación
    );
    
    COMMENT ON TABLE contrato_arrendamiento IS 'Tabla que almacena los contratos de arrendamiento';
    COMMENT ON COLUMN contrato_arrendamiento.id IS 'Identificador único del contrato de arrendamiento';
    COMMENT ON COLUMN contrato_arrendamiento.plazo_pago_mensual IS 'Plazo de pago mensual en días';
    COMMENT ON COLUMN contrato_arrendamiento.plazo_administracion IS 'Plazo de administración en días';
    COMMENT ON COLUMN contrato_arrendamiento.valor_administracion IS 'Valor de la administración';
    COMMENT ON COLUMN contrato_arrendamiento.plazo_entrega IS 'Plazo de entrega en días';
    COMMENT ON COLUMN contrato_arrendamiento.valor_arrendamiento IS 'Valor del arrendamiento';
    COMMENT ON COLUMN contrato_arrendamiento.contrato_general_id IS 'Referencia al contrato general';
    COMMENT ON COLUMN contrato_arrendamiento.activo IS 'Indica si el registro está activo';
    COMMENT ON COLUMN contrato_arrendamiento.fecha_creacion IS 'Fecha de creación del registro';
    COMMENT ON COLUMN contrato_arrendamiento.fecha_modificacion IS 'Fecha de última modificación';
END IF;

IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'cdp') THEN
    CREATE TABLE cdp (
        id SERIAL PRIMARY KEY,                                    -- Identificador único del CDP
        numero_cdp_id INTEGER NOT NULL,                          -- Número identificador del CDP
        fecha_registro DATE NOT NULL,                            -- Fecha de registro del CDP
        vigencia_cdp INTEGER NOT NULL,                           -- Vigencia del CDP
        contrato_general_id INTEGER,                             -- Referencia al contrato general
        activo BOOLEAN NOT NULL,                                 -- Indica si el registro está activo
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación del registro
        fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última modificación
    );
    
    COMMENT ON TABLE cdp IS 'Tabla que almacena los Certificados de Disponibilidad Presupuestal (CDP)';
    COMMENT ON COLUMN cdp.id IS 'Identificador único del CDP';
    COMMENT ON COLUMN cdp.numero_cdp_id IS 'Número identificador del CDP';
    COMMENT ON COLUMN cdp.fecha_registro IS 'Fecha de registro del CDP';
    COMMENT ON COLUMN cdp.vigencia_cdp IS 'Vigencia del CDP';
    COMMENT ON COLUMN cdp.contrato_general_id IS 'Referencia al contrato general';
    COMMENT ON COLUMN cdp.activo IS 'Indica si el registro está activo';
    COMMENT ON COLUMN cdp.fecha_creacion IS 'Fecha de creación del registro';
    COMMENT ON COLUMN cdp.fecha_modificacion IS 'Fecha de última modificación';
END IF;

IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'registro_presupuestal') THEN
    CREATE TABLE registro_presupuestal (
        id SERIAL PRIMARY KEY,                                    -- Identificador único del registro presupuestal
        numero_disponibilidad INTEGER NOT NULL,                   -- Número de disponibilidad presupuestal
        fecha_registro DATE NOT NULL,                            -- Fecha de registro
        vigencia_cdp INTEGER NOT NULL,                           -- Vigencia del CDP asociado
        cdp_id INTEGER,                                          -- Referencia al CDP
        activo BOOLEAN NOT NULL,                                 -- Indica si el registro está activo
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación del registro
        fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última modificación
    );
    
    COMMENT ON TABLE registro_presupuestal IS 'Tabla que almacena los registros presupuestales';
    COMMENT ON COLUMN registro_presupuestal.id IS 'Identificador único del registro presupuestal';
    COMMENT ON COLUMN registro_presupuestal.numero_disponibilidad IS 'Número de disponibilidad presupuestal';
    COMMENT ON COLUMN registro_presupuestal.fecha_registro IS 'Fecha de registro';
    COMMENT ON COLUMN registro_presupuestal.vigencia_cdp IS 'Vigencia del CDP asociado';
    COMMENT ON COLUMN registro_presupuestal.cdp_id IS 'Referencia al CDP';
    COMMENT ON COLUMN registro_presupuestal.activo IS 'Indica si el registro está activo';
    COMMENT ON COLUMN registro_presupuestal.fecha_creacion IS 'Fecha de creación del registro';
    COMMENT ON COLUMN registro_presupuestal.fecha_modificacion IS 'Fecha de última modificación';
END IF;

IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'supervisor_contrato') THEN
    CREATE TABLE supervisor_contrato (
        id SERIAL PRIMARY KEY,                                    -- Identificador único del supervisor
        contrato_general_id INTEGER NOT NULL,                     -- Referencia al contrato general
        supervisor_id INTEGER NOT NULL,                           -- Identificador del supervisor
        activo BOOLEAN NOT NULL,                                 -- Indica si el registro está activo
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación del registro
        fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última modificación
    );
    
    COMMENT ON TABLE supervisor_contrato IS 'Tabla que almacena la relación entre supervisores y contratos';
    COMMENT ON COLUMN supervisor_contrato.id IS 'Identificador único del supervisor';
    COMMENT ON COLUMN supervisor_contrato.contrato_general_id IS 'Referencia al contrato general';
    COMMENT ON COLUMN supervisor_contrato.supervisor_id IS 'Identificador del supervisor';
    COMMENT ON COLUMN supervisor_contrato.activo IS 'Indica si el registro está activo';
    COMMENT ON COLUMN supervisor_contrato.fecha_creacion IS 'Fecha de creación del registro';
    COMMENT ON COLUMN supervisor_contrato.fecha_modificacion IS 'Fecha de última modificación';
END IF;

IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'lugar_ejecucion') THEN
    CREATE TABLE lugar_ejecucion (
        id SERIAL PRIMARY KEY,                                    -- Identificador único del lugar de ejecución
        pais_id INTEGER NOT NULL,                                -- Identificador del país
        municipio_id INTEGER NOT NULL,                           -- Identificador del municipio
        dependencia_id INTEGER NOT NULL,                         -- Identificador de la dependencia
        ciudad_id INTEGER NOT NULL,                              -- Identificador de la ciudad
        sede_id INTEGER NOT NULL,                                -- Identificador de la sede
        direccion VARCHAR(120) NOT NULL,                         -- Dirección del lugar de ejecución
        contrato_general_id INTEGER,                             -- Referencia al contrato general
        activo BOOLEAN NOT NULL,                                 -- Indica si el registro está activo
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación del registro
        fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última modificación
    );
    
    COMMENT ON TABLE lugar_ejecucion IS 'Tabla que almacena los lugares de ejecución de los contratos';
    COMMENT ON COLUMN lugar_ejecucion.id IS 'Identificador único del lugar de ejecución';
    COMMENT ON COLUMN lugar_ejecucion.pais_id IS 'Identificador del país';
    COMMENT ON COLUMN lugar_ejecucion.municipio_id IS 'Identificador del municipio';
    COMMENT ON COLUMN lugar_ejecucion.dependencia_id IS 'Identificador de la dependencia';
    COMMENT ON COLUMN lugar_ejecucion.ciudad_id IS 'Identificador de la ciudad';
    COMMENT ON COLUMN lugar_ejecucion.sede_id IS 'Identificador de la sede';
    COMMENT ON COLUMN lugar_ejecucion.direccion IS 'Dirección del lugar de ejecución';
    COMMENT ON COLUMN lugar_ejecucion.contrato_general_id IS 'Referencia al contrato general';
    COMMENT ON COLUMN lugar_ejecucion.activo IS 'Indica si el registro está activo';
    COMMENT ON COLUMN lugar_ejecucion.fecha_creacion IS 'Fecha de creación del registro';
    COMMENT ON COLUMN lugar_ejecucion.fecha_modificacion IS 'Fecha de última modificación';
END IF;

IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'acta_inicio') THEN
    CREATE TABLE acta_inicio (
        id SERIAL PRIMARY KEY,                                    -- Identificador único del acta de inicio
        usuario_id INTEGER NOT NULL,                             -- Identificador del usuario que crea el acta
        user_legado VARCHAR(20),                                 -- Usuario del sistema legado
        descripcion VARCHAR(500),                                -- Descripción detallada del acta de inicio
        fecha_inicio DATE NOT NULL,                             -- Fecha de inicio del acta
        fecha_fin DATE NOT NULL,                                -- Fecha de finalización del acta
        contrato_general_id INTEGER NOT NULL,                    -- Referencia al contrato general asociado
        activo BOOLEAN NOT NULL,                                -- Indica si el registro está activo
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación del registro
        fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última modificación
    );
    
    COMMENT ON TABLE acta_inicio IS 'Tabla que almacena las actas de inicio de los contratos';
    COMMENT ON COLUMN acta_inicio.id IS 'Identificador único del acta de inicio';
    COMMENT ON COLUMN acta_inicio.usuario_id IS 'Identificador del usuario que crea el acta';
    COMMENT ON COLUMN acta_inicio.user_legado IS 'Usuario del sistema legado';
    COMMENT ON COLUMN acta_inicio.descripcion IS 'Descripción detallada del acta de inicio';
    COMMENT ON COLUMN acta_inicio.fecha_inicio IS 'Fecha de inicio del acta';
    COMMENT ON COLUMN acta_inicio.fecha_fin IS 'Fecha de finalización del acta';
    COMMENT ON COLUMN acta_inicio.contrato_general_id IS 'Referencia al contrato general asociado';
    COMMENT ON COLUMN acta_inicio.activo IS 'Indica si el registro está activo';
    COMMENT ON COLUMN acta_inicio.fecha_creacion IS 'Fecha de creación del registro';
    COMMENT ON COLUMN acta_inicio.fecha_modificacion IS 'Fecha de última modificación';
END IF;

IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'especificaciones_tecnicas') THEN
    CREATE TABLE especificaciones_tecnicas (
        id SERIAL PRIMARY KEY,                                    -- Identificador único de la especificación técnica
        especificacion VARCHAR(20),                                 -- Especificación técnica
        descripcion VARCHAR(500),                                -- Descripción detallada de la especificación técnica
        contrato_general_id INTEGER NOT NULL,                    -- Referencia al contrato general asociado
        activo BOOLEAN NOT NULL,                                -- Indica si el registro está activo
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación del registro
        fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última modificación
    );
    
    COMMENT ON TABLE especificaciones_tecnicas IS 'Tabla que almacena las especificaciones técnicas de los contratos';
    COMMENT ON COLUMN especificaciones_tecnicas.id IS 'Identificador único de la especificación técnica';
    COMMENT ON COLUMN especificaciones_tecnicas.especificacion IS 'Usuario del sistema legado';
    COMMENT ON COLUMN especificaciones_tecnicas.descripcion IS 'Descripción detallada de la especificación técnica';
    COMMENT ON COLUMN especificaciones_tecnicas.contrato_general_id IS 'Referencia al contrato general asociado';
    COMMENT ON COLUMN especificaciones_tecnicas.activo IS 'Indica si el registro está activo';
    COMMENT ON COLUMN especificaciones_tecnicas.fecha_creacion IS 'Fecha de creación del registro';
    COMMENT ON COLUMN especificaciones_tecnicas.fecha_modificacion IS 'Fecha de última modificación';
END IF;


IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'estado_contrato') THEN
    CREATE TABLE estado_contrato (
        id SERIAL PRIMARY KEY,                                    -- Identificador único del estado del contrato
        usuario_id INTEGER NOT NULL,                             -- Identificador del usuario que registra el estado
        motivo VARCHAR(250) NOT NULL,                            -- Motivo del cambio de estado
        fecha_ejecucion_estado TIMESTAMP NOT NULL,               -- Fecha de ejecución del estado
        contrato_general_id INTEGER NOT NULL,                    -- Referencia al contrato general
        estado_id INTEGER NOT NULL,                              -- Identificador del estado
        activo BOOLEAN NOT NULL,                                 -- Indica si el registro está activo
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación del registro
        fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de última modificación
    );
    
    COMMENT ON TABLE estado_contrato IS 'Tabla que almacena el historial de estados de los contratos';
    COMMENT ON COLUMN estado_contrato.id IS 'Identificador único del estado del contrato';
    COMMENT ON COLUMN estado_contrato.usuario_id IS 'Identificador del usuario que registra el estado';
    COMMENT ON COLUMN estado_contrato.motivo IS 'Motivo del cambio de estado';
    COMMENT ON COLUMN estado_contrato.fecha_ejecucion_estado IS 'Fecha de ejecución del estado';
    COMMENT ON COLUMN estado_contrato.contrato_general_id IS 'Referencia al contrato general';
    COMMENT ON COLUMN estado_contrato.estado_id IS 'Identificador del estado';
    COMMENT ON COLUMN estado_contrato.activo IS 'Indica si el registro está activo';
    COMMENT ON COLUMN estado_contrato.fecha_creacion IS 'Fecha de creación del registro';
    COMMENT ON COLUMN estado_contrato.fecha_modificacion IS 'Fecha de última modificación';
END IF;

END $$;

DO $$
BEGIN

IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_convenio_contrato_general'
) THEN
    ALTER TABLE convenio
        ADD CONSTRAINT fk_convenio_contrato_general 
        FOREIGN KEY (contrato_general_id) 
        REFERENCES contrato_general(id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_contratista_contrato_general'
) THEN
    ALTER TABLE contratista
        ADD CONSTRAINT fk_contratista_contrato_general 
        FOREIGN KEY (contrato_general_id) 
        REFERENCES contrato_general(id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_arrendamiento_contrato_general'
) THEN
    ALTER TABLE contrato_arrendamiento
        ADD CONSTRAINT fk_arrendamiento_contrato_general 
        FOREIGN KEY (contrato_general_id) 
        REFERENCES contrato_general(id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_cdp_contrato_general'
) THEN
    ALTER TABLE cdp
        ADD CONSTRAINT fk_cdp_contrato_general 
        FOREIGN KEY (contrato_general_id) 
        REFERENCES contrato_general(id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_registro_cdp'
) THEN
    ALTER TABLE registro_presupuestal
        ADD CONSTRAINT fk_registro_cdp 
        FOREIGN KEY (cdp_id) 
        REFERENCES cdp(id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_supervisor_contrato_general'
) THEN
    ALTER TABLE supervisor_contrato
        ADD CONSTRAINT fk_supervisor_contrato_general 
        FOREIGN KEY (contrato_general_id) 
        REFERENCES contrato_general(id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_lugar_contrato_general'
) THEN
    ALTER TABLE lugar_ejecucion
        ADD CONSTRAINT fk_lugar_contrato_general 
        FOREIGN KEY (contrato_general_id) 
        REFERENCES contrato_general(id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_acta_inicio_contrato_general'
) THEN
    ALTER TABLE acta_inicio
        ADD CONSTRAINT fk_acta_inicio_contrato_general 
        FOREIGN KEY (contrato_general_id) 
        REFERENCES contrato_general(id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_especificaciones_contrato_general'
) THEN
    ALTER TABLE especificaciones_tecnicas
        ADD CONSTRAINT fk_especificaciones_contrato_general 
        FOREIGN KEY (contrato_general_id) 
        REFERENCES contrato_general(id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'uq_acta_inicio_contrato_general'
) THEN
    ALTER TABLE acta_inicio
        ADD CONSTRAINT uq_acta_inicio_contrato_general 
        UNIQUE (contrato_general_id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_estado_contrato_general'
) THEN
    ALTER TABLE estado_contrato
        ADD CONSTRAINT fk_estado_contrato_general 
        FOREIGN KEY (contrato_general_id) 
        REFERENCES contrato_general(id);
END IF;

END $$;

DO $$
BEGIN
-- Agregar índices con validación para optimizar las consultas
IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_convenio_contrato_general'
) THEN
    CREATE INDEX idx_convenio_contrato_general ON convenio(contrato_general_id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_contratista_contrato_general'
) THEN
    CREATE INDEX idx_contratista_contrato_general ON contratista(contrato_general_id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_arrendamiento_contrato_general'
) THEN
    CREATE INDEX idx_arrendamiento_contrato_general ON contrato_arrendamiento(contrato_general_id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_cdp_contrato_general'
) THEN
    CREATE INDEX idx_cdp_contrato_general ON cdp(contrato_general_id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_registro_presupuestal_cdp'
) THEN
    CREATE INDEX idx_registro_presupuestal_cdp ON registro_presupuestal(cdp_id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_supervisor_contrato_general'
) THEN
    CREATE INDEX idx_supervisor_contrato_general ON supervisor_contrato(contrato_general_id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_lugar_ejecucion_contrato_general'
) THEN
    CREATE INDEX idx_lugar_ejecucion_contrato_general ON lugar_ejecucion(contrato_general_id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_acta_inicio_contrato_general'
) THEN
    CREATE INDEX idx_acta_inicio_contrato_general ON acta_inicio(contrato_general_id);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_especificaciones_contrato_general'
) THEN
    CREATE INDEX idx_especificaciones_contrato_general ON especificaciones_tecnicas(contrato_general_id);
END IF;

-- Índices adicionales para búsquedas comunes
IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_acta_inicio_fechas'
) THEN
    CREATE INDEX idx_acta_inicio_fechas ON acta_inicio(fecha_inicio, fecha_fin);
END IF;

IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_estado_contrato_general'
) THEN
    CREATE INDEX idx_estado_contrato_general ON estado_contrato(contrato_general_id);
END IF;

-- Índice adicional para búsquedas por estado
IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_estado_contrato_estado'
) THEN
    CREATE INDEX idx_estado_contrato_estado ON estado_contrato(estado_id);
END IF;

-- Índice para búsquedas por fecha de ejecución
IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_estado_contrato_fecha_ejecucion'
) THEN
    CREATE INDEX idx_estado_contrato_fecha_ejecucion ON estado_contrato(fecha_ejecucion_estado);
END IF;

END $$;

-- Triggers para actualizar fecha_modificacion automáticamente
CREATE OR REPLACE FUNCTION update_fecha_modificacion_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_modificacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para cada tabla si no existen
DO $$
DECLARE
    tabla text;
    trigger_name text;
BEGIN
    FOR tabla IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename IN (
            'convenio', 'contratista', 'contrato_arrendamiento', 'cdp', 
            'registro_presupuestal', 'contrato_general', 'supervisor_contrato', 
            'lugar_ejecucion', 'acta_inicio', 'especificaciones_tecnicas', 'estado_contrato'
        )
    LOOP
        trigger_name := 'tr_' || tabla || '_update_fecha_modificacion';
        
        IF NOT EXISTS (
            SELECT 1 
            FROM pg_trigger 
            WHERE tgname = trigger_name
        ) THEN
            EXECUTE format('
                CREATE TRIGGER %I
                BEFORE UPDATE ON %I
                FOR EACH ROW
                EXECUTE FUNCTION update_fecha_modificacion_column();
            ', trigger_name, tabla);
        END IF;
    END LOOP;
END$$;
