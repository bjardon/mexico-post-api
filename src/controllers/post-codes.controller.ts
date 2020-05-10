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
import {PostCode} from '../models';
import {PostCodeRepository} from '../repositories';

export class PostCodesController {
  constructor(
    @repository(PostCodeRepository)
    public postCodeRepository : PostCodeRepository,
  ) {}

  @post('/post-codes', {
    responses: {
      '200': {
        description: 'PostCode model instance',
        content: {'application/json': {schema: getModelSchemaRef(PostCode)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PostCode, {
            title: 'NewPostCode',
            exclude: ['id'],
          }),
        },
      },
    })
    postCode: Omit<PostCode, 'id'>,
  ): Promise<PostCode> {
    return this.postCodeRepository.create(postCode);
  }

  @get('/post-codes/count', {
    responses: {
      '200': {
        description: 'PostCode model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PostCode) where?: Where<PostCode>,
  ): Promise<Count> {
    return this.postCodeRepository.count(where);
  }

  @get('/post-codes', {
    responses: {
      '200': {
        description: 'Array of PostCode model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PostCode, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PostCode) filter?: Filter<PostCode>,
  ): Promise<PostCode[]> {
    return this.postCodeRepository.find(filter);
  }

  @patch('/post-codes', {
    responses: {
      '200': {
        description: 'PostCode PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PostCode, {partial: true}),
        },
      },
    })
    postCode: PostCode,
    @param.where(PostCode) where?: Where<PostCode>,
  ): Promise<Count> {
    return this.postCodeRepository.updateAll(postCode, where);
  }

  @get('/post-codes/{id}', {
    responses: {
      '200': {
        description: 'PostCode model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PostCode, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PostCode, {exclude: 'where'}) filter?: FilterExcludingWhere<PostCode>
  ): Promise<PostCode> {
    return this.postCodeRepository.findById(id, filter);
  }

  @patch('/post-codes/{id}', {
    responses: {
      '204': {
        description: 'PostCode PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PostCode, {partial: true}),
        },
      },
    })
    postCode: PostCode,
  ): Promise<void> {
    await this.postCodeRepository.updateById(id, postCode);
  }

  @put('/post-codes/{id}', {
    responses: {
      '204': {
        description: 'PostCode PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() postCode: PostCode,
  ): Promise<void> {
    await this.postCodeRepository.replaceById(id, postCode);
  }

  @del('/post-codes/{id}', {
    responses: {
      '204': {
        description: 'PostCode DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.postCodeRepository.deleteById(id);
  }
}
