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
  PostOffice,
  PostCode,
} from '../models';
import {PostOfficeRepository} from '../repositories';

export class PostOfficePostCodeController {
  constructor(
    @repository(PostOfficeRepository) protected postOfficeRepository: PostOfficeRepository,
  ) { }

  @get('/post-offices/{id}/post-codes', {
    responses: {
      '200': {
        description: 'Array of PostOffice has many PostCode',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PostCode)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PostCode>,
  ): Promise<PostCode[]> {
    return this.postOfficeRepository.postCodes(id).find(filter);
  }

  @post('/post-offices/{id}/post-codes', {
    responses: {
      '200': {
        description: 'PostOffice model instance',
        content: {'application/json': {schema: getModelSchemaRef(PostCode)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PostOffice.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PostCode, {
            title: 'NewPostCodeInPostOffice',
            exclude: ['id'],
            optional: ['postOfficeId']
          }),
        },
      },
    }) postCode: Omit<PostCode, 'id'>,
  ): Promise<PostCode> {
    return this.postOfficeRepository.postCodes(id).create(postCode);
  }

  @patch('/post-offices/{id}/post-codes', {
    responses: {
      '200': {
        description: 'PostOffice.PostCode PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PostCode, {partial: true}),
        },
      },
    })
    postCode: Partial<PostCode>,
    @param.query.object('where', getWhereSchemaFor(PostCode)) where?: Where<PostCode>,
  ): Promise<Count> {
    return this.postOfficeRepository.postCodes(id).patch(postCode, where);
  }

  @del('/post-offices/{id}/post-codes', {
    responses: {
      '200': {
        description: 'PostOffice.PostCode DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PostCode)) where?: Where<PostCode>,
  ): Promise<Count> {
    return this.postOfficeRepository.postCodes(id).delete(where);
  }
}
