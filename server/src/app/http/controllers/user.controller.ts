import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as configs from '../../../../config/environment';

import {Path, POST, FormParam, ContextResponse} from 'typescript-rest';
import {Tags} from 'typescript-rest-swagger';
import {getManager} from 'typeorm';

import {BaseController} from './base.controller';
import {User} from '../../user';
import {ResponseBase} from '../response.base';
import {LoggerService} from '../../shared/services/logger.service';

const secret = configs.system.auth.secret;

@Path('/user')
@Tags('User')
export class UserController extends BaseController<User> {

  repository = getManager().getRepository(User);

  @POST
  @Path('/login')
  public async logar(
    @FormParam('username') username: string,
    @FormParam('password') password: string,
    @ContextResponse res: express.Response): Promise<ResponseBase<string>> {

    if (!username || !password) {
      res.status(403).send('Você deve enviar as credenciais!');
      return;
    }

    const encryptPassword = User.encryptPassword(password);

    const user = await this.repository.findOne({
      'username': username,
      'password': encryptPassword
    });
    if (!user) {
      res.status(401).send('Os dados de usuário e/ou senha não correspondem');
      return;
    }
    delete user.password;

    const payload = {
      name: user.firstname,
      role: user.role,
    };

    LoggerService.logger(`usuário ${user.firstname} autenticado`, 'info');
    const token = jwt.sign(payload, secret, {
      expiresIn: '1h'
    });

    return new ResponseBase('Autenticado com sucesso', token);
  }
}