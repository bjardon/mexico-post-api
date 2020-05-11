import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {State, StateRelations, Municipality} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MunicipalityRepository} from './municipality.repository';

export class StateRepository extends DefaultCrudRepository<
  State,
  typeof State.prototype.id,
  StateRelations
> {

  public readonly municipalities: HasManyRepositoryFactory<Municipality, typeof State.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MunicipalityRepository') protected municipalityRepositoryGetter: Getter<MunicipalityRepository>,
  ) {
    super(State, dataSource);
    this.municipalities = this.createHasManyRepositoryFactoryFor('municipalities', municipalityRepositoryGetter,);
    this.registerInclusionResolver('municipalities', this.municipalities.inclusionResolver);
  }
}
