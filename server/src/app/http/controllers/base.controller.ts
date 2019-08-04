import * as express from 'express';

import {Abstract, Path, PathParam, GET, POST, PUT, DELETE, ContextResponse} from 'typescript-rest';
import {LoggerService} from '../../shared/services/logger.service';
import {Security} from 'typescript-rest-swagger';

import {ResponseBase} from '../response.base';
import {Repository} from 'typeorm';

@Abstract
export abstract class BaseController<T> {

  abstract repository: Repository<any>;

  /**
   * List all
   */
  @Security('BearerAuth')
  @GET
  public async show(@ContextResponse res: express.Response): Promise<ResponseBase<T>> {
    try {
      return new ResponseBase<T>('Listagem concluída com sucesso', await this.repository.find());
    } catch (err) {
      LoggerService.logger(`response fail ${err}`, 'error');
      res.status(400).send('Erro ao buscar lista');
    }
  }

  /**
   * Find by id
   * @param id
   */
  @Security('BearerAuth')
  @GET
  @Path('/:id')
  public async find(@PathParam('id') id: number, @ContextResponse res: express.Response): Promise<ResponseBase<T>> {
    try {
      return new ResponseBase<T>('Informação encontrada com sucesso', await this.repository.findOneById(id));
    } catch (err) {
      LoggerService.logger(`response fail ${err}`, 'error');
      res.status(400).send('Erro ao buscar informação');
    }
  }

  /**
   * Create new
   * @param object
   */
  @Security('BearerAuth')
  @POST
  public async create(object: T, @ContextResponse res: express.Response): Promise<ResponseBase<T>> {
    try {
      return new ResponseBase<T>('Gravado com sucesso', await this.repository.save(object));
    } catch (err) {
      LoggerService.logger(`response fail ${err}`, 'error');
      res.status(400).send('Erro ao gravar informação');
    }
  }


  /**
   * Update by id
   * @param id
   * @param object
   */
  @Security('BearerAuth')
  @PUT
  @Path('/:id')
  public async update(@PathParam('id') id: number, object: T, @ContextResponse res: express.Response): Promise<ResponseBase<T>> {
    try {
      await this.repository.updateById(id, object);
      return new ResponseBase<T>('Atualizado com sucesso');
    } catch (err) {
      LoggerService.logger(`response fail ${err}`, 'error');
      res.status(400).send('Erro ao atualizar informação');
    }
  }

  /**
   * Delete by id
   * @param id
   */
  @Security('BearerAuth')
  @DELETE
  @Path('/:id')
  public async delete(@PathParam('id') id: number, @ContextResponse res: express.Response): Promise<ResponseBase<T>> {
    try {
      await this.repository.deleteById(id);
      return new ResponseBase<T>('Informação apagado com sucesos');
    } catch (err) {
      LoggerService.logger(`response fail ${err}`, 'error');
      res.status(400).send('Erro ao apagar informação');
    }
  }
}
