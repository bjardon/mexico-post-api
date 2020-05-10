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
import {PostOffice} from '../models';
import {PostOfficeRepository} from '../repositories';

export class PostOfficeController {
  constructor(
    @repository(PostOfficeRepository)
    public postOfficeRepository : PostOfficeRepository,
  ) {}

  @post('/post-offices', {
    responses: {
      '200': {
        description: 'PostOffice model instance',
        content: {'application/json': {schema: getModelSchemaRef(PostOffice)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PostOffice, {
            title: 'NewPostOffice',
            exclude: ['id'],
          }),
        },
      },
    })
    postOffice: Omit<PostOffice, 'id'>,
  ): Promise<PostOffice> {
    return this.postOfficeRepository.create(postOffice);
  }

  @get('/post-offices/count', {
    responses: {
      '200': {
        description: 'PostOffice model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PostOffice) where?: Where<PostOffice>,
  ): Promise<Count> {
    return this.postOfficeRepository.count(where);
  }

  @get('/post-offices', {
    responses: {
      '200': {
        description: 'Array of PostOffice model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PostOffice, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PostOffice) filter?: Filter<PostOffice>,
  ): Promise<PostOffice[]> {
    return this.postOfficeRepository.find(filter);
  }

  @patch('/post-offices', {
    responses: {
      '200': {
        description: 'PostOffice PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PostOffice, {partial: true}),
        },
      },
    })
    postOffice: PostOffice,
    @param.where(PostOffice) where?: Where<PostOffice>,
  ): Promise<Count> {
    return this.postOfficeRepository.updateAll(postOffice, where);
  }

  @get('/post-offices/{id}', {
    responses: {
      '200': {
        description: 'PostOffice model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PostOffice, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PostOffice, {exclude: 'where'}) filter?: FilterExcludingWhere<PostOffice>
  ): Promise<PostOffice> {
    return this.postOfficeRepository.findById(id, filter);
  }

  @patch('/post-offices/{id}', {
    responses: {
      '204': {
        description: 'PostOffice PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PostOffice, {partial: true}),
        },
      },
    })
    postOffice: PostOffice,
  ): Promise<void> {
    await this.postOfficeRepository.updateById(id, postOffice);
  }

  @put('/post-offices/{id}', {
    responses: {
      '204': {
        description: 'PostOffice PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() postOffice: PostOffice,
  ): Promise<void> {
    await this.postOfficeRepository.replaceById(id, postOffice);
  }

  @del('/post-offices/{id}', {
    responses: {
      '204': {
        description: 'PostOffice DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.postOfficeRepository.deleteById(id);
  }
}
