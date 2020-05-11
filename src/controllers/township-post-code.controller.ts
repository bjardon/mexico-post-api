import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Township,
  PostCode,
} from '../models';
import {TownshipRepository} from '../repositories';

export class TownshipPostCodeController {
  constructor(
    @repository(TownshipRepository)
    public townshipRepository: TownshipRepository,
  ) { }

  @get('/townships/{id}/post-code', {
    responses: {
      '200': {
        description: 'PostCode belonging to Township',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PostCode)},
          },
        },
      },
    },
  })
  async getPostCode(
    @param.path.string('id') id: typeof Township.prototype.id,
  ): Promise<PostCode> {
    return this.townshipRepository.postCode(id);
  }
}
