import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Municipality,
  State,
} from '../models';
import {MunicipalityRepository} from '../repositories';

export class MunicipalityStateController {
  constructor(
    @repository(MunicipalityRepository)
    public municipalityRepository: MunicipalityRepository,
  ) { }

  @get('/municipalities/{id}/state', {
    responses: {
      '200': {
        description: 'State belonging to Municipality',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(State)},
          },
        },
      },
    },
  })
  async getState(
    @param.path.string('id') id: typeof Municipality.prototype.id,
  ): Promise<State> {
    return this.municipalityRepository.state(id);
  }
}
