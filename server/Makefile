.PHONY: run

run: node_modules docs build

node_modules:
	@echo "Installing dependencies"
	@npm install

docs:
	@echo "Generate documentations"
	@npm run generate-doc
	@npm run generate-doc-api

build:
	@echo "Compiling solution"
	@npm run build

start:
	@echo "Booting application"
	@node dist/src/server.js