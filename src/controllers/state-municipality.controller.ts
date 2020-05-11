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
  State,
  Municipality,
} from '../models';
import {StateRepository} from '../repositories';

export class StateMunicipalityController {
  constructor(
    @repository(StateRepository) protected stateRepository: StateRepository,
  ) { }

  @get('/states/{id}/municipalities', {
    responses: {
      '200': {
        description: 'Array of State has many Municipality',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Municipality)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Municipality>,
  ): Promise<Municipality[]> {
    return this.stateRepository.municipalities(id).find(filter);
  }

  @post('/states/{id}/municipalities', {
    responses: {
      '200': {
        description: 'State model instance',
        content: {'application/json': {schema: getModelSchemaRef(Municipality)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof State.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipality, {
            title: 'NewMunicipalityInState',
            exclude: ['id'],
            optional: ['stateId']
          }),
        },
      },
    }) municipality: Omit<Municipality, 'id'>,
  ): Promise<Municipality> {
    return this.stateRepository.municipalities(id).create(municipality);
  }

  @patch('/states/{id}/municipalities', {
    responses: {
      '200': {
        description: 'State.Municipality PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipality, {partial: true}),
        },
      },
    })
    municipality: Partial<Municipality>,
    @param.query.object('where', getWhereSchemaFor(Municipality)) where?: Where<Municipality>,
  ): Promise<Count> {
    return this.stateRepository.municipalities(id).patch(municipality, where);
  }

  @del('/states/{id}/municipalities', {
    responses: {
      '200': {
        description: 'State.Municipality DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Municipality)) where?: Where<Municipality>,
  ): Promise<Count> {
    return this.stateRepository.municipalities(id).delete(where);
  }
}
