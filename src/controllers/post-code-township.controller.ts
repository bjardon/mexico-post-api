import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  PostCode,
  Township,
} from '../models';
import {PostCodeRepository} from '../repositories';

export class PostCodeTownshipController {
  constructor(
    @repository(PostCodeRepository) protected postCodeRepository: PostCodeRepository,
  ) { }

  @get('/post-codes/{id}/townships', {
    responses: {
      '200': {
        description: 'Array of PostCode has many Township',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Township)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Township>,
  ): Promise<Township[]> {
    return this.postCodeRepository.townships(id).find(filter);
  }

  @post('/post-codes/{id}/townships', {
    responses: {
      '200': {
        description: 'PostCode model instance',
        content: {'application/json': {schema: getModelSchemaRef(Township)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PostCode.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Township, {
            title: 'NewTownshipInPostCode',
            exclude: ['id'],
            optional: ['postCodeId']
          }),
        },
      },
    }) township: Omit<Township, 'id'>,
  ): Promise<Township> {
    return this.postCodeRepository.townships(id).create(township);
  }

  @patch('/post-codes/{id}/townships', {
    responses: {
      '200': {
        description: 'PostCode.Township PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Township, {partial: true}),
        },
      },
    })
    township: Partial<Township>,
    @param.query.object('where', getWhereSchemaFor(Township)) where?: Where<Township>,
  ): Promise<Count> {
    return this.postCodeRepository.townships(id).patch(township, where);
  }

  @del('/post-codes/{id}/townships', {
    responses: {
      '200': {
        description: 'PostCode.Township DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Township)) where?: Where<Township>,
  ): Promise<Count> {
    return this.postCodeRepository.townships(id).delete(where);
  }
}
