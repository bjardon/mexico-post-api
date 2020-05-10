import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Municipality>) {
    super(data);
  }
}

export interface MunicipalityRelations {
  // describe navigational properties here
}

export type MunicipalityWithRelations = Municipality & MunicipalityRelations;
