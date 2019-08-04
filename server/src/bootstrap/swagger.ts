import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';

export default (server: express.Application, definitions: object, theme: string, endpoint: string) => {
    server.use(endpoint, swaggerUi.serve, swaggerUi.setup(
        definitions, { customCss: theme }
    ));
};
