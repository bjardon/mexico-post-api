import {belongsTo, Entity, model, property} from '@loopback/repository';
import {City, CityWithRelations} from './city.model';
import {Municipality, MunicipalityWithRelations} from './municipality.model';
import {PostCode} from './post-code.model';

@model()
export class Township extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  class: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @belongsTo(() => Municipality)
  municipalityId: string;

  @belongsTo(() => PostCode)
  postCodeId: string;

  @belongsTo(() => City)
  cityId: string;

  constructor(data?: Partial<Township>) {
    super(data);
  }
}

export interface TownshipRelations {
  municipality?: MunicipalityWithRelations;
  city?: CityWithRelations;
}

export type TownshipWithRelations = Township & TownshipRelations;
