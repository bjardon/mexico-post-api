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
  City,
  Township,
} from '../models';
import {CityRepository} from '../repositories';

export class CityTownshipController {
  constructor(
    @repository(CityRepository) protected cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/townships', {
    responses: {
      '200': {
        description: 'Array of City has many Township',
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
    return this.cityRepository.townships(id).find(filter);
  }

  @post('/cities/{id}/townships', {
    responses: {
      '200': {
        description: 'City model instance',
        content: {'application/json': {schema: getModelSchemaRef(Township)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof City.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Township, {
            title: 'NewTownshipInCity',
            exclude: ['id'],
            optional: ['cityId']
          }),
        },
      },
    }) township: Omit<Township, 'id'>,
  ): Promise<Township> {
    return this.cityRepository.townships(id).create(township);
  }

  @patch('/cities/{id}/townships', {
    responses: {
      '200': {
        description: 'City.Township PATCH success count',
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
    return this.cityRepository.townships(id).patch(township, where);
  }

  @del('/cities/{id}/townships', {
    responses: {
      '200': {
        description: 'City.Township DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Township)) where?: Where<Township>,
  ): Promise<Count> {
    return this.cityRepository.townships(id).delete(where);
  }
}
