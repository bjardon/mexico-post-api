import {belongsTo, Entity, model, property} from '@loopback/repository';
import {State, StateWithRelations} from './state.model';

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

  constructor(data?: Partial<Municipality>) {
    super(data);
  }
}

export interface MunicipalityRelations {
  state?: StateWithRelations;
}

export type MunicipalityWithRelations = Municipality & MunicipalityRelations;
