#!/bin/sh

#!/bin/sh

# Check if backend/.env exists; if not, copy .env.dev
if [ ! -f /usr/src/app/.env ]; then
  echo "No .env file found, copying .env.dev to .env"
  cp /usr/src/app/.env.dev /usr/src/app/.env
else
  echo ".env file exists, skipping copy"
fi
