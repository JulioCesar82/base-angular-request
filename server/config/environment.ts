
import * as path from 'path';
import * as crypto from 'crypto';

// dependencies
require('dotenv').config();

const pathRoot = path.resolve(`${__dirname}/../`);

const environment = process.env.APP_ENV  || 'production';

/* Generate hash to secret app */
const current_date = (new Date()).valueOf().toString();
const random = Math.random().toString();
const hash_random = crypto.createHash('sha256').update(current_date + random).digest('hex');

/*
 * CONFIGURAÇÕES DO SERVIDOR
 */
export const app = {
    port: process.env.APP_PORT || 80,
    production: environment === 'production',
    version: process.env.APP_VERSION || 1.0
};

/*
 * CONFIGURAÇÕES DO SISTEMA
 */
export const system = {
    default: `${pathRoot}/${process.env.FILE_SETTINGS}` || `${pathRoot}/config/defaults.json`,
    logs: `${pathRoot}/${process.env.DIR_LOGS}` || `${pathRoot}storage/logs`,
    auth: {
        secret: process.env.APP_KEY || hash_random,
        type: 'bearer'
    }
};

/*
 * CONFIGURAÇÕES DE DIRETÓRIOS
 */
export const locate = {
    root: pathRoot,
    storage: `${pathRoot}/${process.env.DIR_STORAGE}` || `${pathRoot}/src/storage`,
    logs: `${pathRoot}/${process.env.DIR_LOGS}` || `${pathRoot}/src/storage/logs`,
    front: `${pathRoot}/${process.env.DIR_FRONT_END}` || `${pathRoot}/../dist/view`,
};

/*
 * CONFIGURAÇÕES DE COMUNICAÇÃO
 */
export const http = {
    delay: process.env.REQUEST_DELAY || 1000,
    attempts: process.env.REQUEST_ATTEMPTS || 5
};