import {DefaultCrudRepository} from '@loopback/repository';
import {Township, TownshipRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TownshipRepository extends DefaultCrudRepository<
  Township,
  typeof Township.prototype.id,
  TownshipRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Township, dataSource);
  }
}
