import * as filesystem from 'fs';

export abstract class FileService {

  /**
   * Displays the contents of the file
   * @param path Arquivo de referência
   */
  public static open(path: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (await FileService.exists(path)) {
        filesystem.readFile(path, 'utf8', (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      }
    });
  }

  /**
   * Create file with the desired content
   * @param path Arquivo de referência
   * @param data Conteúdo do arquivo
   */
  public static save(path, data): Promise<boolean> {
    return new Promise((resolve, reject) => {
      filesystem.writeFile(path, data, 'utf8', err => {
        if (err) {
          reject(err);
        }
      });
      resolve(true);      
    });
  }

  /**
   * Delete desired file
   * @param path Arquivo de referência
   */
  public static delete(path): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (await FileService.exists(path)) {
        filesystem.unlink(path, err => {
          if (err) {
            reject(err);
          }
        });
      }
      resolve(true);
    });
  }

  /**
   * Create a directory
   * @param path Diretório de referência
   */
  public static mkdir(path): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!await FileService.exists(path)) {
        filesystem.mkdir(path, err => {
          if (err) {
            reject(err);
          }
        });
      }
      resolve(true);
    });
  }

  /**
   * Checks if file exists
   * @param path Arquivo de referência
   */
  public static exists(path): Promise<boolean> {
    return new Promise((resolve, reject) => {
      filesystem.stat(path, (err, exists) => {
        if (!exists) {
          resolve(false);
        }
      });  
      resolve(true);
    });
  }

}
