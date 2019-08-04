import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

// imports
import {HttpService} from '../../shared/helpers/http.service';
import {Account} from './account';
import {RequestBase} from '../../shared/request.base';

@Injectable()
export class AccountService extends HttpService<RequestBase<Account>> {
  endpoint = 'user';

  login(usuario: Account): Observable<RequestBase<Account>> {
    return this.renderRequest(
      this.http.post<RequestBase<Account>>(this.resource(this.endpoint, 'login'), usuario, this.headers())
    );
  }
}
