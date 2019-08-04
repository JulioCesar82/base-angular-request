import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError as ObservableThrowError, of as ObservableOf} from 'rxjs';
import {catchError, mergeMap, delay, retryWhen, timeout, take, concat, tap, finalize} from 'rxjs/operators';

// dependencies
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../../environments/environment';
import { DataStorage } from './../../resources/data-storage';
import { RequestBase } from '../request.base';

import { Alert } from '../layout/dynamic/alert/alert';
import { AlertService } from '../layout/dynamic/alert/alert.service';

@Injectable()
export abstract class HttpService<T> {
  private serverAPI: string = environment.serverAPI;
  abstract endpoint: string;

  constructor(
    protected http: HttpClient,
    private cookieService: CookieService,
    private alertService: AlertService,
    private storage: DataStorage
  ) {}

  /**
   * List all
   *
   * @returns T
   */
  public show(): Observable<RequestBase<T>> {
    return this.renderRequest(
      this.http.get<RequestBase<T>>(
        this.resource(this.endpoint),
        this.headers()
      )
    );
  }

  /**
   * Find by id
   *
   * @param id code identifier
   * @return T
   */
  public find(id: number): Observable<RequestBase<T>> {
    return this.renderRequest(
      this.http.get<RequestBase<T>>(this.resource(this.endpoint, id))
    );
  }

  /**
   * Abstract method to save or update
   * Verify existence of identifier
   *
   * @param entity
   * @return T
   */
  public save(entity: T): Observable<RequestBase<T>> {
    return entity['id']
      ? this.update(entity['id'], entity)
      : this.create(entity);
  }

  /**
   * Create new
   *
   * @param entity
   * @return T
   */
  protected create(entity: T): Observable<RequestBase<T>> {
    return this.renderRequest(
      this.http.post<RequestBase<T>>(
        this.resource(this.endpoint),
        entity,
        this.headers()
      )
    );
  }

  /**
   * Update by id
   *
   * @param id
   * @param entity
   * @return T
   */
  protected update(id: number, entity: T): Observable<RequestBase<T>> {
    return this.renderRequest(
      this.http.put<RequestBase<T>>(
        this.resource(this.endpoint, id),
        entity,
        this.headers()
      )
    );
  }

  /**
   * Delete by id
   *
   * @param id
   * @return T
   */
  public delete(id: number): Observable<RequestBase<T>> {
    return this.renderRequest(
      this.http.delete(this.resource(this.endpoint, id), this.headers())
    );
  }

  /**
   * Handles data sent from server
   *
   * @param req data
   */
  protected renderRequest(req: Observable<any>) {
    this.storage.isLoading.next(true);
    return req.pipe(
      retryWhen((http: Observable<HttpResponseBase>) => {
        return http.pipe(
          mergeMap((resp: HttpResponseBase) => {
            return resp.status === 401 || resp.status === 403
              ? ObservableThrowError(resp)
              : ObservableOf(resp);
          }),
          delay(1000),
          take(3),
          concat(
            ObservableThrowError({
              error: 'Desculpe, o serviço não respondeu após 3 tentativas',
              status: 500
            })
          )
        );
      }),
      timeout(10000),
      tap(
        response =>
          this.alertService.setMensagem(new Alert(response['message'], 200)),
        error => console.log('Algo pode estar queimando lá atrás')
      ),
      catchError(this.handleError.bind(this)),
      finalize(() => this.storage.isLoading.next(false))
    );
  }

  /**
   * Unify parameters with endpoint
   *
   * @return string
   */
  protected resource(...params): string {
    params.unshift(this.serverAPI);
    return params.join('/');
  }

  /**
   * Configure header and verify token existence
   *
   * @return HttpHeaders
   */
  protected headers(): Object {
    const optionsHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    if (this.cookieService.check('token')) {
      optionsHeader['authorization'] = this.cookieService.get('token');
    }

    return {
      headers: new HttpHeaders(optionsHeader)
    };
  }

  /**
   * Abstract error handle method
   *
   * @return ErrorObservable
   */
  protected handleError(err: HttpErrorResponse): Observable<never> {
    const alerta = new Alert(err.error, err.status);

    // Offline, Off air or Timeout
    if (!navigator.onLine || err.status === 0 || err.name === 'TimeoutError') {
      alerta.estadoAlerta = 500;
    }
    if (!navigator.onLine) {
      alerta.texto = 'Sem conexão com a internet';
    }
    if (err.status === 0) {
      alerta.texto = 'Serviço está indisponível';
    }
    if (err.name === 'TimeoutError') {
      alerta.texto = 'Excedeu o tempo limite';
    }

    this.alertService.setMensagem(alerta);
    return ObservableThrowError(err);
  }
}
