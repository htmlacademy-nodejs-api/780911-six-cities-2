import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { Comment } from '../../types/index.js';

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
