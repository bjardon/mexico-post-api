import {Entity, hasMany, model, property} from '@loopback/repository';
import {Municipality, MunicipalityWithRelations} from './municipality.model';

@model()
export class State extends Entity {
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
  abbreviation: string;

  @hasMany(() => Municipality)
  municipalities: Municipality[];

  constructor(data?: Partial<State>) {
    super(data);
  }
}

export interface StateRelations {
  municipalities?: MunicipalityWithRelations[];
}

export type StateWithRelations = State & StateRelations;
