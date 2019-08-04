const async = require('async');

/**
 * Autor
 * http://cangaceirojavascript.com.br/promises-implementando-mecanismo-de-retry/
 */

// env
require('dotenv').config();
const reqWait: number = parseInt(process.env.REQUEST_DELAY, 0) || 1000;
const reqAttemps: number = parseInt(process.env.REQUEST_ATTEMPS, 0) || 3;

const delay = time =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(), time)
  );

export const RetryPromiseHelper = (fn, wait = reqWait, attemps = reqAttemps): Promise<string> => {
  let response = null;
  return new Promise((resolve, reject) => {
    async.doUntil(
      cb => {
        fn()
          .then((data) => {
            response = data;
            cb();
          })
          .catch(async () => {
            attemps--;
            await delay(reqWait);
            cb();
          });
      },
      () => attemps === 0 || response !== null,
      () => {
        if (response) {
          resolve(response);
        } else {
          reject('not-found');
        }
      }
    );
  });
};
