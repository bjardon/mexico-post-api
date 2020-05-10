import {DefaultCrudRepository} from '@loopback/repository';
import {PostOffice, PostOfficeRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PostOfficeRepository extends DefaultCrudRepository<
  PostOffice,
  typeof PostOffice.prototype.id,
  PostOfficeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(PostOffice, dataSource);
  }
}
