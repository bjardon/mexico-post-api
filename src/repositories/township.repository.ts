import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Township, TownshipRelations, Municipality} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MunicipalityRepository} from './municipality.repository';

export class TownshipRepository extends DefaultCrudRepository<
  Township,
  typeof Township.prototype.id,
  TownshipRelations
> {

  public readonly municipality: BelongsToAccessor<Municipality, typeof Township.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MunicipalityRepository') protected municipalityRepositoryGetter: Getter<MunicipalityRepository>,
  ) {
    super(Township, dataSource);
    this.municipality = this.createBelongsToAccessorFor('municipality', municipalityRepositoryGetter,);
    this.registerInclusionResolver('municipality', this.municipality.inclusionResolver);
  }
}
