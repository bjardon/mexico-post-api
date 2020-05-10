import {DefaultCrudRepository} from '@loopback/repository';
import {PostCode, PostCodeRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PostCodeRepository extends DefaultCrudRepository<
  PostCode,
  typeof PostCode.prototype.id,
  PostCodeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(PostCode, dataSource);
  }
}
