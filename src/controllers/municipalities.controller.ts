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
import {Municipality} from '../models';
import {MunicipalityRepository} from '../repositories';

export class MunicipalitiesController {
  constructor(
    @repository(MunicipalityRepository)
    public municipalityRepository : MunicipalityRepository,
  ) {}

  @post('/municipalities', {
    responses: {
      '200': {
        description: 'Municipality model instance',
        content: {'application/json': {schema: getModelSchemaRef(Municipality)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipality, {
            title: 'NewMunicipality',
            exclude: ['id'],
          }),
        },
      },
    })
    municipality: Omit<Municipality, 'id'>,
  ): Promise<Municipality> {
    return this.municipalityRepository.create(municipality);
  }

  @get('/municipalities/count', {
    responses: {
      '200': {
        description: 'Municipality model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Municipality) where?: Where<Municipality>,
  ): Promise<Count> {
    return this.municipalityRepository.count(where);
  }

  @get('/municipalities', {
    responses: {
      '200': {
        description: 'Array of Municipality model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Municipality, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Municipality) filter?: Filter<Municipality>,
  ): Promise<Municipality[]> {
    return this.municipalityRepository.find(filter);
  }

  @patch('/municipalities', {
    responses: {
      '200': {
        description: 'Municipality PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipality, {partial: true}),
        },
      },
    })
    municipality: Municipality,
    @param.where(Municipality) where?: Where<Municipality>,
  ): Promise<Count> {
    return this.municipalityRepository.updateAll(municipality, where);
  }

  @get('/municipalities/{id}', {
    responses: {
      '200': {
        description: 'Municipality model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Municipality, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Municipality, {exclude: 'where'}) filter?: FilterExcludingWhere<Municipality>
  ): Promise<Municipality> {
    return this.municipalityRepository.findById(id, filter);
  }

  @patch('/municipalities/{id}', {
    responses: {
      '204': {
        description: 'Municipality PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipality, {partial: true}),
        },
      },
    })
    municipality: Municipality,
  ): Promise<void> {
    await this.municipalityRepository.updateById(id, municipality);
  }

  @put('/municipalities/{id}', {
    responses: {
      '204': {
        description: 'Municipality PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() municipality: Municipality,
  ): Promise<void> {
    await this.municipalityRepository.replaceById(id, municipality);
  }

  @del('/municipalities/{id}', {
    responses: {
      '204': {
        description: 'Municipality DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.municipalityRepository.deleteById(id);
  }
}
