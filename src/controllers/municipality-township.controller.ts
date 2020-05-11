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
  Municipality,
  Township,
} from '../models';
import {MunicipalityRepository} from '../repositories';

export class MunicipalityTownshipController {
  constructor(
    @repository(MunicipalityRepository) protected municipalityRepository: MunicipalityRepository,
  ) { }

  @get('/municipalities/{id}/townships', {
    responses: {
      '200': {
        description: 'Array of Municipality has many Township',
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
    return this.municipalityRepository.townships(id).find(filter);
  }

  @post('/municipalities/{id}/townships', {
    responses: {
      '200': {
        description: 'Municipality model instance',
        content: {'application/json': {schema: getModelSchemaRef(Township)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Municipality.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Township, {
            title: 'NewTownshipInMunicipality',
            exclude: ['id'],
            optional: ['municipalityId']
          }),
        },
      },
    }) township: Omit<Township, 'id'>,
  ): Promise<Township> {
    return this.municipalityRepository.townships(id).create(township);
  }

  @patch('/municipalities/{id}/townships', {
    responses: {
      '200': {
        description: 'Municipality.Township PATCH success count',
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
    return this.municipalityRepository.townships(id).patch(township, where);
  }

  @del('/municipalities/{id}/townships', {
    responses: {
      '200': {
        description: 'Municipality.Township DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Township)) where?: Where<Township>,
  ): Promise<Count> {
    return this.municipalityRepository.townships(id).delete(where);
  }
}
