## Fiscal App Node

### Note

This project was develop with [TypeScript](https://www.typescriptlang.org/).

------------

## Changelog

[Learn about the latest improvements](changelog).

------------

### Prerequisites

The project have dependencies that require [Node](https://nodejs.org/en/) 6.9.0 or higher, together
with NPM 3 or higher and [OpenSSL](https://www.openssl.org/) in the machine.

------------

# 1. Project Configuration

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)
```bash
npm install
```

------------

# 2. Development server

The app will automatically reload if you change any of the source files. Navigate to `http://localhost:8080/`.

```bash
npm run start
```

------------

# 3. Running tests


------------

# 4. Generate build

The build artifacts will be stored in the `dist/` directory.

```bash
npm run build
node dist/server.js
```

------------

# 5. Documentation

Run to generate and view documentation, build artifacts will be stored in the `documentation/` directory.

```bash
npm run generate-doc
npm run serve-doc
```

Run to generate Swagger API documentation, build artifacts will be stored in the `documentation-api/` directory. Navigate to `http://localhost:8080/swagger` while the project is running.
```bash
npm run generate-doc-api
```

------------

## Current Project Team Members

* [person](https://github.com/person) -
**Example Person** <example@person.net>