import {Entity, model, property} from '@loopback/repository';

@model()
export class PostOffice extends Entity {
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
  code: string;


  constructor(data?: Partial<PostOffice>) {
    super(data);
  }
}

export interface PostOfficeRelations {
  // describe navigational properties here
}

export type PostOfficeWithRelations = PostOffice & PostOfficeRelations;
