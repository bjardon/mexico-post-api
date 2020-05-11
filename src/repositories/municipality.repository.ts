import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Municipality, MunicipalityRelations, State, Township, PostOffice} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {StateRepository} from './state.repository';
import {TownshipRepository} from './township.repository';
import {PostOfficeRepository} from './post-office.repository';

export class MunicipalityRepository extends DefaultCrudRepository<
  Municipality,
  typeof Municipality.prototype.id,
  MunicipalityRelations
> {

  public readonly state: BelongsToAccessor<State, typeof Municipality.prototype.id>;

  public readonly townships: HasManyRepositoryFactory<Township, typeof Municipality.prototype.id>;

  public readonly postOffices: HasManyRepositoryFactory<PostOffice, typeof Municipality.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StateRepository') protected stateRepositoryGetter: Getter<StateRepository>, @repository.getter('TownshipRepository') protected townshipRepositoryGetter: Getter<TownshipRepository>, @repository.getter('PostOfficeRepository') protected postOfficeRepositoryGetter: Getter<PostOfficeRepository>,
  ) {
    super(Municipality, dataSource);
    this.postOffices = this.createHasManyRepositoryFactoryFor('postOffices', postOfficeRepositoryGetter,);
    this.registerInclusionResolver('postOffices', this.postOffices.inclusionResolver);
    this.townships = this.createHasManyRepositoryFactoryFor('townships', townshipRepositoryGetter,);
    this.registerInclusionResolver('townships', this.townships.inclusionResolver);
    this.state = this.createBelongsToAccessorFor('state', stateRepositoryGetter,);
    this.registerInclusionResolver('state', this.state.inclusionResolver);
  }
}
