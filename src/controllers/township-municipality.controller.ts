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
  Municipality,
} from '../models';
import {TownshipRepository} from '../repositories';

export class TownshipMunicipalityController {
  constructor(
    @repository(TownshipRepository)
    public townshipRepository: TownshipRepository,
  ) { }

  @get('/townships/{id}/municipality', {
    responses: {
      '200': {
        description: 'Municipality belonging to Township',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Municipality)},
          },
        },
      },
    },
  })
  async getMunicipality(
    @param.path.string('id') id: typeof Township.prototype.id,
  ): Promise<Municipality> {
    return this.townshipRepository.municipality(id);
  }
}
