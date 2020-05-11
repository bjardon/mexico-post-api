import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Municipality} from './municipality.model';
import {Township} from './township.model';

@model()
export class PostCode extends Entity {
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

  @belongsTo(() => Municipality)
  municipalityId: string;

  @hasMany(() => Township)
  townships: Township[];

  constructor(data?: Partial<PostCode>) {
    super(data);
  }
}

export interface PostCodeRelations {
  // describe navigational properties here
}

export type PostCodeWithRelations = PostCode & PostCodeRelations;
