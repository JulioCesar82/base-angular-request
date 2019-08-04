import {createConnection} from 'typeorm';
import {LoggerService} from '../app/shared/services/logger.service';

export default (definitions: string) => {
    createConnection(definitions)
    .then(connection => {})
    .catch(err => LoggerService.logger(`Database ${err}`, 'error'));
};
