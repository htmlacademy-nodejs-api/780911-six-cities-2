import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDTO } from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';

export interface CommentService {
  create(
    offerId: string,
    dto: CreateCommentDTO
  ): Promise<DocumentType<CommentEntity>>;
}
