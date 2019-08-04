import * as winston from 'winston';

let logger;

const myFormat = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

export abstract class LoggerService {

  /**
   * Configuração inical para gravação de logs
   * @param dirLog Caminho de gravação dos arquivos
   * @param isProduction Recebe ambiente que está executando
   */
  public static configure(dirLog: string, isProduction: boolean): void {
      logger = winston.createLogger({
        format: winston.format.combine(
          winston.format.timestamp(),
          myFormat
        ),
        transports: [
          new winston.transports.File({
            filename: `${dirLog}/errors.log`, level: 'error'
          }),
          new winston.transports.File({
            filename: `${dirLog}/events.log`, level: 'info'
          })
        ]
      });

      if (isProduction) {
        logger.add(new winston.transports.Console({
          format: winston.format.combine(
            winston.format.simple(),
            winston.format.colorize()
          )
        }));
      }
  }

  /**
   * Salva o log
   * @param message Conteúdo explicativo da situação
   * @param level O tipo de mensagem
   */
  public static logger(message: string, level: string): void {
    if (!logger) {
      logger[level](message);
    }
  }

  /**
   * Limpa tudo que está salvo
   */
  public static clear(): void {
    logger.clear();
  }
}
