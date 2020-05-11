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
  PostOffice,
} from '../models';
import {MunicipalityRepository} from '../repositories';

export class MunicipalityPostOfficeController {
  constructor(
    @repository(MunicipalityRepository) protected municipalityRepository: MunicipalityRepository,
  ) { }

  @get('/municipalities/{id}/post-offices', {
    responses: {
      '200': {
        description: 'Array of Municipality has many PostOffice',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PostOffice)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PostOffice>,
  ): Promise<PostOffice[]> {
    return this.municipalityRepository.postOffices(id).find(filter);
  }

  @post('/municipalities/{id}/post-offices', {
    responses: {
      '200': {
        description: 'Municipality model instance',
        content: {'application/json': {schema: getModelSchemaRef(PostOffice)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Municipality.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PostOffice, {
            title: 'NewPostOfficeInMunicipality',
            exclude: ['id'],
            optional: ['municipalityId']
          }),
        },
      },
    }) postOffice: Omit<PostOffice, 'id'>,
  ): Promise<PostOffice> {
    return this.municipalityRepository.postOffices(id).create(postOffice);
  }

  @patch('/municipalities/{id}/post-offices', {
    responses: {
      '200': {
        description: 'Municipality.PostOffice PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PostOffice, {partial: true}),
        },
      },
    })
    postOffice: Partial<PostOffice>,
    @param.query.object('where', getWhereSchemaFor(PostOffice)) where?: Where<PostOffice>,
  ): Promise<Count> {
    return this.municipalityRepository.postOffices(id).patch(postOffice, where);
  }

  @del('/municipalities/{id}/post-offices', {
    responses: {
      '200': {
        description: 'Municipality.PostOffice DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PostOffice)) where?: Where<PostOffice>,
  ): Promise<Count> {
    return this.municipalityRepository.postOffices(id).delete(where);
  }
}
