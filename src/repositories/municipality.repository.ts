import {DefaultCrudRepository} from '@loopback/repository';
import {Municipality, MunicipalityRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MunicipalityRepository extends DefaultCrudRepository<
  Municipality,
  typeof Municipality.prototype.id,
  MunicipalityRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Municipality, dataSource);
  }
}
