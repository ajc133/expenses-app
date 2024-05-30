#!/bin/bash
set -eux

npx prisma migrate reset -f

mitmweb -p 8001 --save-stream-file ./flowfile --no-web-open-browser &
sleep 2 # Wait for it to load

./generate-flows.sh
pkill mitmweb
rm -f ./openapi.yml
mitmproxy2swagger -i ./flowfile -o ./openapi.yml -p http://localhost:3000/ -f flow -e
sed -i 's/ignore://' openapi.yml
mitmproxy2swagger -i ./flowfile -o ./openapi.yml -p http://localhost:3000/ -f flow -e
rm -f ./flowfile
npx @redocly/cli build-docs ./openapi.yml
