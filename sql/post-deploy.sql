ALTER TABLE documento_contrato
ADD COLUMN usuario_id INTEGER,
ADD COLUMN usuario_rol VARCHAR(40),
ADD COLUMN actual BOOLEAN;

COMMENT ON COLUMN documento_contrato.usuario_id IS 'Referencia del usuario quien registra el documento';
COMMENT ON COLUMN documento_contrato.usuario_rol IS 'Rol del usuario quien registra el documento';
COMMENT ON COLUMN documento_contrato.actual IS 'Indicador de documento actual';