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
  Municipality,
} from '../models';
import {PostCodeRepository} from '../repositories';

export class PostCodeMunicipalityController {
  constructor(
    @repository(PostCodeRepository)
    public postCodeRepository: PostCodeRepository,
  ) { }

  @get('/post-codes/{id}/municipality', {
    responses: {
      '200': {
        description: 'Municipality belonging to PostCode',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Municipality)},
          },
        },
      },
    },
  })
  async getMunicipality(
    @param.path.string('id') id: typeof PostCode.prototype.id,
  ): Promise<Municipality> {
    return this.postCodeRepository.municipality(id);
  }
}
