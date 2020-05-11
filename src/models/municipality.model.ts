import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {State, StateWithRelations} from './state.model';
import {Township, TownshipWithRelations} from './township.model';

@model()
export class Municipality extends Entity {
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

  @belongsTo(() => State)
  stateId: string;

  @hasMany(() => Township)
  townships: Township[];

  constructor(data?: Partial<Municipality>) {
    super(data);
  }
}

export interface MunicipalityRelations {
  state?: StateWithRelations;
  townships?: TownshipWithRelations[];
}

export type MunicipalityWithRelations = Municipality & MunicipalityRelations;
