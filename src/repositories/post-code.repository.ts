import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {PostCode, PostCodeRelations, Municipality, Township} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MunicipalityRepository} from './municipality.repository';
import {TownshipRepository} from './township.repository';

export class PostCodeRepository extends DefaultCrudRepository<
  PostCode,
  typeof PostCode.prototype.id,
  PostCodeRelations
> {

  public readonly municipality: BelongsToAccessor<Municipality, typeof PostCode.prototype.id>;

  public readonly townships: HasManyRepositoryFactory<Township, typeof PostCode.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MunicipalityRepository') protected municipalityRepositoryGetter: Getter<MunicipalityRepository>, @repository.getter('TownshipRepository') protected townshipRepositoryGetter: Getter<TownshipRepository>,
  ) {
    super(PostCode, dataSource);
    this.townships = this.createHasManyRepositoryFactoryFor('townships', townshipRepositoryGetter,);
    this.registerInclusionResolver('townships', this.townships.inclusionResolver);
    this.municipality = this.createBelongsToAccessorFor('municipality', municipalityRepositoryGetter,);
    this.registerInclusionResolver('municipality', this.municipality.inclusionResolver);
  }
}
