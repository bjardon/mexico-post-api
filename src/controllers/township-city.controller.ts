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
  City,
} from '../models';
import {TownshipRepository} from '../repositories';

export class TownshipCityController {
  constructor(
    @repository(TownshipRepository)
    public townshipRepository: TownshipRepository,
  ) { }

  @get('/townships/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to Township',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(City)},
          },
        },
      },
    },
  })
  async getCity(
    @param.path.string('id') id: typeof Township.prototype.id,
  ): Promise<City> {
    return this.townshipRepository.city(id);
  }
}
