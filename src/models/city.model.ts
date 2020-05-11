import {Entity, hasMany, model, property} from '@loopback/repository';
import {Township, TownshipWithRelations} from './township.model';

@model()
export class City extends Entity {
  @property({
    type: 'string',
    required: true,
    id: true
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Township)
  townships: Township[];

  constructor(data?: Partial<City>) {
    super(data);
  }
}

export interface CityRelations {
  townships?: TownshipWithRelations[];
}

export type CityWithRelations = City & CityRelations;
