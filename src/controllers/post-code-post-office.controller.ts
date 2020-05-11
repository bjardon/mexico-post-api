import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PostCode,
  PostOffice,
} from '../models';
import {PostCodeRepository} from '../repositories';

export class PostCodePostOfficeController {
  constructor(
    @repository(PostCodeRepository)
    public postCodeRepository: PostCodeRepository,
  ) { }

  @get('/post-codes/{id}/post-office', {
    responses: {
      '200': {
        description: 'PostOffice belonging to PostCode',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PostOffice)},
          },
        },
      },
    },
  })
  async getPostOffice(
    @param.path.string('id') id: typeof PostCode.prototype.id,
  ): Promise<PostOffice> {
    return this.postCodeRepository.postOffice(id);
  }
}
