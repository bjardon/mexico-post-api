import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Municipality, MunicipalityWithRelations} from './municipality.model';
import {PostOffice, PostOfficeWithRelations} from './post-office.model';
import {Township, TownshipWithRelations} from './township.model';

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

  @belongsTo(() => PostOffice)
  postOfficeId: string;

  constructor(data?: Partial<PostCode>) {
    super(data);
  }
}

export interface PostCodeRelations {
  municipality?: MunicipalityWithRelations;
  townships?: TownshipWithRelations[];
  postOffice?: PostOfficeWithRelations;
}

export type PostCodeWithRelations = PostCode & PostCodeRelations;
