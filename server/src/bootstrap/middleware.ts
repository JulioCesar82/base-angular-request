import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

export default (server: express.Application) => {
    server.use(cors(getCors()));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: false}));
};

function getCors(): cors.CorsOptions {
    return {
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'authorization'],
        credentials: true,
        methods: 'GET,OPTIONS,PUT,POST,DELETE',
        origin: '*',
        preflightContinue: false
    };
}
