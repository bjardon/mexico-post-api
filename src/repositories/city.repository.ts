import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {City, CityRelations, Township} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TownshipRepository} from './township.repository';

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id,
  CityRelations
> {

  public readonly townships: HasManyRepositoryFactory<Township, typeof City.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TownshipRepository') protected townshipRepositoryGetter: Getter<TownshipRepository>,
  ) {
    super(City, dataSource);
    this.townships = this.createHasManyRepositoryFactoryFor('townships', townshipRepositoryGetter,);
    this.registerInclusionResolver('townships', this.townships.inclusionResolver);
  }
}
