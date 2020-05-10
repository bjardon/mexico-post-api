import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Township} from '../models';
import {TownshipRepository} from '../repositories';

export class TownshipsController {
  constructor(
    @repository(TownshipRepository)
    public townshipRepository : TownshipRepository,
  ) {}

  @post('/townships', {
    responses: {
      '200': {
        description: 'Township model instance',
        content: {'application/json': {schema: getModelSchemaRef(Township)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Township, {
            title: 'NewTownship',
            exclude: ['id'],
          }),
        },
      },
    })
    township: Omit<Township, 'id'>,
  ): Promise<Township> {
    return this.townshipRepository.create(township);
  }

  @get('/townships/count', {
    responses: {
      '200': {
        description: 'Township model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Township) where?: Where<Township>,
  ): Promise<Count> {
    return this.townshipRepository.count(where);
  }

  @get('/townships', {
    responses: {
      '200': {
        description: 'Array of Township model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Township, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Township) filter?: Filter<Township>,
  ): Promise<Township[]> {
    return this.townshipRepository.find(filter);
  }

  @patch('/townships', {
    responses: {
      '200': {
        description: 'Township PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Township, {partial: true}),
        },
      },
    })
    township: Township,
    @param.where(Township) where?: Where<Township>,
  ): Promise<Count> {
    return this.townshipRepository.updateAll(township, where);
  }

  @get('/townships/{id}', {
    responses: {
      '200': {
        description: 'Township model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Township, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Township, {exclude: 'where'}) filter?: FilterExcludingWhere<Township>
  ): Promise<Township> {
    return this.townshipRepository.findById(id, filter);
  }

  @patch('/townships/{id}', {
    responses: {
      '204': {
        description: 'Township PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Township, {partial: true}),
        },
      },
    })
    township: Township,
  ): Promise<void> {
    await this.townshipRepository.updateById(id, township);
  }

  @put('/townships/{id}', {
    responses: {
      '204': {
        description: 'Township PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() township: Township,
  ): Promise<void> {
    await this.townshipRepository.replaceById(id, township);
  }

  @del('/townships/{id}', {
    responses: {
      '204': {
        description: 'Township DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.townshipRepository.deleteById(id);
  }
}
