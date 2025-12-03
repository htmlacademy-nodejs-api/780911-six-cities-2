import { injectable, inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/Logger/index.js';

import { Component } from '../../types/component.enum.js';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDTO } from './dto/create-comment.dto.js';
import { OfferEntity } from '../offer/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(
    offerId: string,
    dto: CreateCommentDTO
  ): Promise<DocumentType<CommentEntity>> {
    const newComment = await this.commentModel.create(dto);

    await this.offerModel.findByIdAndUpdate(offerId, {
      $push: { comments: newComment._id },
    });

    this.logger.info(
      `New comment created: ${newComment._id} to an offer ${offerId}`
    );
    return newComment;
  }
}
