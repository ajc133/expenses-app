# Expense App Tracker

## Generating OpenAPI Spec + HTML

- `npx prisma migrate reset`
- `mitmweb -p 8001`
- Download flows to this directory
- `./generate-flows.sh`
- `mitmproxy2swagger -i ./flows -o ./openapi.yml -p http://localhost:3000/ -f flow -e`
- `sed -i 's/ignore://' openapi.yml`
- `mitmproxy2swagger -i ./flows -o ./openapi.yml -p http://localhost:3000/ -f flow -e`
- `npx @redocly/cli build-docs ./openapi.yml`

