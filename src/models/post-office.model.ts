import {Entity, hasMany, model, property} from '@loopback/repository';
import {PostCode, PostCodeWithRelations} from './post-code.model';

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

  @property({
    type: 'string',
  })
  municipalityId?: string;

  @hasMany(() => PostCode)
  postCodes: PostCode[];

  constructor(data?: Partial<PostOffice>) {
    super(data);
  }
}

export interface PostOfficeRelations {
  postCodes?: PostCodeWithRelations[];
}

export type PostOfficeWithRelations = PostOffice & PostOfficeRelations;
