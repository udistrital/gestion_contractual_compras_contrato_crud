#!/usr/bin/env bash

set -e
set -u
set -o pipefail

export GESTION_CONTRACTUAL_CRUD_USERNAME="$(aws ssm get-parameter --name /${PARAMETER_STORE}/gestion_contractual_crud/db/username --output text --query Parameter.Value)"
export GESTION_CONTRACTUAL_CRUD_PASS="$(aws ssm get-parameter --with-decryption --name /${PARAMETER_STORE}/gestion_contractual_crud/db/password --output text --query Parameter.Value)"

echo "$GESTION_CONTRACTUAL_CRUD_USERNAME"
echo "$GESTION_CONTRACTUAL_CRUD_PASS"

exec node dist/main
