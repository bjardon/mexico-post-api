import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Municipality, MunicipalityWithRelations} from './municipality.model';

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

  constructor(data?: Partial<Township>) {
    super(data);
  }
}

export interface TownshipRelations {
  municipality?: MunicipalityWithRelations;
}

export type TownshipWithRelations = Township & TownshipRelations;
