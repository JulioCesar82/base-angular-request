import {Path} from 'typescript-rest';
import {Tags} from 'typescript-rest-swagger';
import {getManager} from 'typeorm';

import {Example} from '../../example';
import {BaseController} from './base.controller';

@Path('/example')
@Tags('Example')
export class ExampleController extends BaseController<Example> {

  repository = getManager().getRepository(Example);

}
