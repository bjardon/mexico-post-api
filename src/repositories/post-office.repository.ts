import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostOffice, PostOfficeRelations, PostCode} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PostCodeRepository} from './post-code.repository';

export class PostOfficeRepository extends DefaultCrudRepository<
  PostOffice,
  typeof PostOffice.prototype.id,
  PostOfficeRelations
> {

  public readonly postCodes: HasManyRepositoryFactory<PostCode, typeof PostOffice.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PostCodeRepository') protected postCodeRepositoryGetter: Getter<PostCodeRepository>,
  ) {
    super(PostOffice, dataSource);
    this.postCodes = this.createHasManyRepositoryFactoryFor('postCodes', postCodeRepositoryGetter,);
    this.registerInclusionResolver('postCodes', this.postCodes.inclusionResolver);
  }
}
