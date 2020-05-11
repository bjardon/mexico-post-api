import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostCode, PostCodeRelations, Municipality} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MunicipalityRepository} from './municipality.repository';

export class PostCodeRepository extends DefaultCrudRepository<
  PostCode,
  typeof PostCode.prototype.id,
  PostCodeRelations
> {

  public readonly municipality: BelongsToAccessor<Municipality, typeof PostCode.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MunicipalityRepository') protected municipalityRepositoryGetter: Getter<MunicipalityRepository>,
  ) {
    super(PostCode, dataSource);
    this.municipality = this.createBelongsToAccessorFor('municipality', municipalityRepositoryGetter,);
    this.registerInclusionResolver('municipality', this.municipality.inclusionResolver);
  }
}
