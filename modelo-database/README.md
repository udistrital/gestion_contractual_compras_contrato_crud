## Contrato General

| **ARGO**        | **ARGO V2**     | **NOTAS**            |
|-----------------|-----------------|----------------------|
| objeto_contrato | objeto |         Igual, mismos datos.             |
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
| unidad_ejecutora      | | |
| fecha_registro      |   | |
| tipologia_contrato      | | tipologia_especifica_id o tipo_contrato_id|
| tipo_compromiso | tipo_compromiso_id | Igual, mismos datos.|
| modalidad_seleccion | modalidad seleccion_id | Igual, mismos datos.|
| procedimiento      | procedimiento_id   | Igual, mismos datos. |
| regimen_contratacion      | regimen_contratacion_id   | Igual, mismos datos. |
| tipo_gasto      | tipo_gasto_id   | Igual, mismos datos. |
| tema_gasto_inversion      | tema_gasto_inversion_id   | Igual, mismos datos. |
| origen_presupuesto      | origen_presupuesto_id   | Igual, mismos datos. |
| origen_recursos      | origen_recursos_id   | Igual, mismos datos. |
| tipo_moneda      | tipo_moneda_id   | Igual, mismos datos. |
| valor_contrato_me | valor_contrato_me |                      |
| valor_tasa_cambio | valor_tasa_cambio |                      |
| observaciones | observaciones |                      |
| supervisor | **supervisor_contrato**.supervisor_id |                      |
| clase_contratista | **contratista**.clase_contratista |                      |
| convenio | |                      |
| numero_constancia |  |       No se usa, deprecado.               |
| estado | activo |                      |
| tipo_contrato | tipo_contrato_id |                      |
| lugar_ejecucion | lugar_ejecucion_id |                      |

## Contrato Arrendamiento

| **ARGO**        | **ARGO V2**     | **NOTAS**            |
|-----------------|-----------------|----------------------|
| destinacion | destinacion |       |
| plazo_pago_mensual | plazo_pago_mensual |       |
| reajuste | reajuste |       |
| plazo_administracion | plazo_administracion |       |
| valor_administracion | valor_administracion |       |
| plazo_entrega | plazo_entrega |       |
| valor_arrendamiento | valor_arrendamiento |       |
