import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Municipality, MunicipalityRelations, State} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {StateRepository} from './state.repository';

export class MunicipalityRepository extends DefaultCrudRepository<
  Municipality,
  typeof Municipality.prototype.id,
  MunicipalityRelations
> {

  public readonly state: BelongsToAccessor<State, typeof Municipality.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StateRepository') protected stateRepositoryGetter: Getter<StateRepository>,
  ) {
    super(Municipality, dataSource);
    this.state = this.createBelongsToAccessorFor('state', stateRepositoryGetter,);
    this.registerInclusionResolver('state', this.state.inclusionResolver);
  }
}
