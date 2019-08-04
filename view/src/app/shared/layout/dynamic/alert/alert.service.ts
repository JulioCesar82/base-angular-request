import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Observable, BehaviorSubject} from 'rxjs';

// imports
import {Alert} from './alert';

@Injectable()
export class AlertService {
  private _alerta = new BehaviorSubject<Alert>(null);
  private _manterMensagens = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!this._manterMensagens) {
          this._alerta.next(null);
        }
        this._manterMensagens = false;
      }
    });
  }

  public setMensagem(mensagem: Alert, manterMensagens = false): void {
    this._manterMensagens = manterMensagens;
    this._alerta.next(mensagem);
  }

  public getMensagem(): Observable<Alert> {
    return this._alerta.asObservable();
  }
}
