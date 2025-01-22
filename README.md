# Gestion Contractual CRUD

API CRUD de gestión contractual core para el ARGO V2.

## Tecnologías Implementadas y Versiones
-  Node.js v20
-  NestJS 10
-  PostgreSQL

## Variables de Entorno
```
- GESTION_CONTRACTUAL_CRUD_HOST // Host de la base de datos
- GESTION_CONTRACTUAL_CRUD_PORT // Puerto de la base de datos
- GESTION_CONTRACTUAL_CRUD_USERNAME // Usuario de la base de datos
- GESTION_CONTRACTUAL_CRUD_PASS // Contraseña de la base de datos
- GESTION_CONTRACTUAL_CRUD_DB // Nombre de la base de datos
- GESTION_CONTRACTUAL_CRUD_SCHEMA // Esquema de la base de datos (PUBLIC por defecto)
```
## Ejecución del Proyecto
```
pnpm install
pnpm run start:dev
```

## Estado CI

| Develop | Relese 0.0.1 | Master |
| -- | -- | -- |
| [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/gestion_contractual_crud/status.svg?ref=refs/heads/develop)](https://hubci.portaloas.udistrital.edu.co/udistrital/gestion_contractual_crud) | [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/gestion_contractual_crud/status.svg?ref=refs/heads/release/0.0.1)](https://hubci.portaloas.udistrital.edu.co/udistrital/gestion_contractual_crud) | [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/gestion_contractual_crud/status.svg)](https://hubci.portaloas.udistrital.edu.co/udistrital/gestion_contractual_crud) |


# Modelo de Datos :card_file_box:

![Modelo de datos Formularios dinámicos](/modelo-database/modelo-datos-core-argo.png)

[![Descargar Modelo de Datos](https://img.shields.io/badge/Descargar%20Modelo%20de%20Datos-Download-blue?style=for-the-badge)](/modelo-database/modelo-datos-core-argo.drawio)


## Licencia

This file is part of gestion_contractual_crud.

gestion_contractual_crud is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

gestion_contractual_crud is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with gestion_contractual_crud. If not, see https://www.gnu.org/licenses/.
