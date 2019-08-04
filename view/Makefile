.PHONY: run

run: node_modules docs build start

node_modules:
	@echo "Installing dependencies"
	@npm install

docs:
	@echo "Generate documentations"
	@npm run generate-doc

build:
	@echo "Compiling solution"
	@npm run build