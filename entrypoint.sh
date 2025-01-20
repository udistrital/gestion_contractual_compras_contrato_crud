set -e
set -u
set -o pipefail

export GESTION_CONTRACTUAL_CRUD_USERNAME="$(aws ssm get-parameter --name /${PARAMETER_STORE}/gestion_contractual_crud/db/username --output text --query Parameter.Value)"
export GESTION_CONTRACTUAL_CRUD_PASS="$(aws ssm get-parameter --with-decryption --name /${PARAMETER_STORE}/gestion_contractual_crud/db/password --output text --query Parameter.Value)"

exec node dist/main