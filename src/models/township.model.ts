import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Township>) {
    super(data);
  }
}

export interface TownshipRelations {
  // describe navigational properties here
}

export type TownshipWithRelations = Township & TownshipRelations;
