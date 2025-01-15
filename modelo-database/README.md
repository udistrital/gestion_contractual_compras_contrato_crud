# Acta inicio

| **ARGO**                       | **ARGO V2**                                | **NOTAS**                                          |
|--------------------------------|--------------------------------------------|----------------------------------------------------|
| numero_contrato                | contrato_general_id                        | Se reemplaza por contrato_general_id               |
| vigencia                       | contrato_general_id                        | Se reemplaza por contrato_general_id               |
| usuario                        | usuario_legado                             | Almacena el dato del usuario para la migración     |
| ordenador_gasto                | ordenaodor_id                              | No parecen ser los datos de ID, revisar DB actual. |
| fecha_registro                 | fecha_creacion                             | Cambio a timestamp                                 |


## Contrato General

| **ARGO**                       | **ARGO V2**                                | **NOTAS**                                          |
|--------------------------------|--------------------------------------------|----------------------------------------------------|
| objeto_contrato                | objeto                                     |                                                    |
| plazo_ejecucion                | plazo_ejecucion                            |                                                    |
| forma_pago                     | medio_pago_id                              |                                                    |
| ordenador_gasto                | **tabla ordenador_contrato**               | Se crea una tabla nueva para ordenador             |
| clausula_registro_presupuestal | clausula_registro_presupuestal             |                                                    |
| sede_solicitante               | **solicitante**.sede_solicitante_id        | Se extrae a tabla solicitante.                     |
| dependencia_solicitante        | **solicitante**.dependencia_solicitante_id | Se extrae a tabla solicitante.                     |
| contratista                    | **contratista**.numero_documento           | Cambio de numeric(16) a varchar                    |
| unidad_ejecucion               | unidad_ejecucion_id                        |                                                    |
| valor_contrato                 | valor_pesos                                |                                                    |
| justificacion                  | justificacion                              |                                                    |
| descripcion_forma_pago         | modo_pago                                  |                                                    |
| condiciones                    | condiciones                                | Se mantiene en plural por contexto de los datos    |
| unidad_ejecutora               | unidad_ejecutora_id                        |                                                    |
| fecha_registro                 | fecha_creacion                             | Cambio a date a timestamp                          |
| tipologia_contrato             | tipologia_especifica_id                    |                                                    |
| tipo_compromiso                | tipo_compromiso_id                         |                                                    |
| modalidad_seleccion            | modalidad_seleccion_id                     |                                                    |
| procedimiento                  | procedimiento_id                           |                                                    |
| regimen_contratacion           | regimen_contratacion_id                    |                                                    |
| tipo_gasto                     | tipo_gasto_id                              |                                                    |
| tema_gasto_inversion           | tema_gasto_inversion_id                    |                                                    |
| origen_presupuesto             | origen_presupuesto_id                      |                                                    |
| origen_recursos                | origen_recursos_id                         |                                                    |
| tipo_moneda                    | tipo_moneda_id                             |                                                    |
| valor_contrato_me              | valor_contrato_me                          |                                                    |
| valor_tasa_cambio              | valor_tasa_cambio                          |                                                    |
| tipo_control                   | tipo_control_id                            |                                                    |
| observaciones                  | observaciones                              |                                                    |
| supervisor                     | **supervisor_contrato**.supervisor_id      |                                                    |
| clase_contratista              | **contratista**.clase_contratista_id       |                                                    |
| convenio                       |                                            | No se usa, depreciado.                             |
| numero_constancia              |                                            | No se usa, depreciado.                             |
| estado                         | activo                                     |                                                    |
| tipo_contrato                  | tipo_contrato_id                           |                                                    |
| lugar_ejecucion                | **tabla lugar ejecución**                  |                                                    |
| especificaciones_tecnicas      | **tabla especificacion_tecnica**           | Se crea una tabla nueva para ordenador             |
| clausulas_contractuales        |                                            | No se usa.                                         |
| actividades                    | actividades                                | Se mantiene en plural por contexto de los datos    |
| usuario                        | usuario_legado                             |                                                    |


## Contrato Arrendamiento

| **ARGO**             | **ARGO V2**          | **NOTAS**                          |
|----------------------|----------------------|------------------------------------|
| destinacion          | destinacion          |                                    |
| plazo_pago_mensual   | plazo_pago_mensual   |                                    |
| reajuste             | reajuste             |                                    |
| plazo_administracion | plazo_administracion |                                    |
| valor_administracion | valor_administracion |                                    |
| plazo_entrega        | plazo_entrega        |                                    |
| valor_arrendamiento  | valor_arrendamiento  |                                    |


# CDP - disponibilidad presupuestal (contrato disponibilidad)

| **ARGO**       | **ARGO V2**    | **NOTAS**            |
|----------------|----------------|----------------------|
| numero_cdp     | numero_cdp_id  | Se mantiene sigla cdp|
| estado         | activo         |                      |
| fecha_registro | fecha_registro |                      |
| vigencia_cdp   | vigencia_cdp   | Se mantiene sigla cdp|


# Registro presupuestal

| **ARGO**              | **ARGO V2**           | **NOTAS**            |
|-----------------------|-----------------------|----------------------|
| estado                | activo                |                      |
| fecha_registro        | fecha_registro        |                      |
| registro_presupuestal | registro_presupuestal |                      |
| vigencia_rp           | vigencia_rp           |                      |


# Especificación Técnica

| **ARGO**            | **ARGO V2** | **NOTAS**                    |
|---------------------|-------------|------------------------------|
| puc                 |             | No se usa                    |
| catalogo            |             | No se usa                    |
| solicitud_necesidad |             | No se usa                    |
| descripcion         | descripcion |                              |
| cantidad            | cantidad    |                              |
| unidad              |             | No se usa                    |
| valor               | valor_total |                              |
| iva                 |             | No se usa                    |


# Lugar Ejecucion

| **ARGO**    | **ARGO V2**    | **NOTAS**            |
|-------------|----------------|----------------------|
| direccion   | direccion      |                      |
| sede        | sede_id        |                      |
| dependencia | dependencia_id |                      |
| ciudad      | ciudad_id      |                      |



