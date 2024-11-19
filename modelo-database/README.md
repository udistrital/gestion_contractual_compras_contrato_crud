| **ARGO**        | **ARGO V2**     | **NOTAS**            |
|-----------------|-----------------|----------------------|
| objeto_contrato | objeto_contrato |                      |
| plazo_ejecucion | plazo_ejecucion |                      |
| forma_pago      | medio_pago_id   | Igual, mismos datos. |
| ordenador_gasto | ordenaodor_id   | No parecen ser los datos de ID, revisar DB actual. |
| clausula_registro_presupuestal | clausula_registro_presupuestal | |
| sede_solicitante | **solicitante**.sede_solicitante_id |Se extrae a tabla solicitante.|
| dependencia_solicitante | **solicitante**.dependencia_solicitante_id |Se extrae a tabla solicitante.|
| contratista      | **contratista**.numero_documento   | Cambio de numeric(16) a varchar |
| unidad_ejecucion      | unidad_ejecucion_id   | Igual, mismos datos. |
| valor_contrato      | valor_pesos   | Igual, mismos datos.|
| justificacion      | justificacion   | |
| forma_pago      | medio_pago_id   | Igual, mismos datos. |
| descripcion_forma_pago      | modo_pago   | Igual, mismos datos. |
| descripcion_forma_pago      | modo_pago   | Igual, mismos datos. |
| condiciones      | condiciones   | |
