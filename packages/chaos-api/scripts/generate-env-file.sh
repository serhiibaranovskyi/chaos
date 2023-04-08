#!/usr/bin/env bash
set +e

env="dev"
output_path=""

for i in "$@"; do
  case $i in
  -e=* | --environment=*)
    env="${i#*=}"
    case $env in
    dev | test) ;;

    *)
      echo "invalid value for --environment: $env, must be dev | test"
      exit 1
      ;;
    esac
    shift
    ;;
  -o=* | --output=*)
    output_path="${i#*=}"
    ;;
  *) ;;

  esac
done

[[ -z $env ]] && {
  echo "-e must be set."
  exit 1
}

[[ -z $output_path ]] && {
  echo "-o must be set."
  exit 1
}

if [[ "$env" == "dev" ]]; then
  cat > "$output_path" <<EOL
DATABASE_URL="postgresql://chaos:chaos@chaos-postgres:5432/chaos"
MESSAGE_BROKER_URL="amqp://chaos-rabbitmq:5672"
EOL
elif [[ "$env" == "test" ]]; then
  cat > "$output_path" <<EOL
DATABASE_URL=postgresql://chaos:chaos@localhost:5433/chaos-test
EOL
fi
