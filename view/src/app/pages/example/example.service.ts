import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// imports
import { HttpService } from '../../shared/helpers/http.service';
import { Example } from './entities/example';
import { RequestBase } from '../../shared/request.base';

@Injectable({
  providedIn: 'root'
})
export class ExampleService extends HttpService<Example> {
  endpoint = 'information';
}
