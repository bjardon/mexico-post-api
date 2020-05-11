import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Township, TownshipRelations, Municipality, PostCode, City} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MunicipalityRepository} from './municipality.repository';
import {PostCodeRepository} from './post-code.repository';
import {CityRepository} from './city.repository';

export class TownshipRepository extends DefaultCrudRepository<
  Township,
  typeof Township.prototype.id,
  TownshipRelations
> {

  public readonly municipality: BelongsToAccessor<Municipality, typeof Township.prototype.id>;

  public readonly postCode: BelongsToAccessor<PostCode, typeof Township.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof Township.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MunicipalityRepository') protected municipalityRepositoryGetter: Getter<MunicipalityRepository>, @repository.getter('PostCodeRepository') protected postCodeRepositoryGetter: Getter<PostCodeRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Township, dataSource);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
    this.postCode = this.createBelongsToAccessorFor('postCode', postCodeRepositoryGetter,);
    this.registerInclusionResolver('postCode', this.postCode.inclusionResolver);
    this.municipality = this.createBelongsToAccessorFor('municipality', municipalityRepositoryGetter,);
    this.registerInclusionResolver('municipality', this.municipality.inclusionResolver);
  }
}
