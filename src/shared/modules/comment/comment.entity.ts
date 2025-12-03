import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { Comment } from '../../types/index.js';

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  },
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public text!: string;

  @prop({ required: true })
  public publicationDate!: Date;

  @prop({ required: true })
  public rating!: number;

  constructor(commentData: Comment) {
    super();
    const { text, publicationDate, rating } = commentData;
    this.text = text;
    this.publicationDate = publicationDate;
    this.rating = rating;
  }
}

export const CommentModel = getModelForClass(CommentEntity);
