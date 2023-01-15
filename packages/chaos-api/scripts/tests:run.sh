#!/bin/sh

if [ ! -f '.env.test' ]; then
  echo "The .env.test file does not exist."
  echo "Please make sure that you have installed the test environment correctly."
  echo "More information can be found in the readme file."
  exit 1
fi

pnpm run test:docker:up
# todo use better method
sleep 4
pnpm run test:db:migrate
dotenv -e .env.test -- jest -i
pnpm run test:docker:down 1> /dev/null 2> /dev/null
