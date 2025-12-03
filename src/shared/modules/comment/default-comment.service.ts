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
  // TODO: is not yet clear how to keep connection offer <=> comments.
  // so comment count is WIP
  // TODO: comment creation is done by logged users only

  // public async incCommentCount(offerId: string): Promise<void> {
  //   await this.offerModel
  //     .findByIdAndUpdate(offerId, {
  //       $inc: {
  //         commentCount: 1,
  //       },
  //     })
  //     .exec();
  // }

  private async updateOfferRating(offerId: string) {
    const offer = await this.offerModel
      .findById(offerId)
      .populate<{ comments: DocumentType<CommentEntity>[] }>('comments');

    const comments = offer!.comments;
    const sum = comments.reduce((acc, c) => acc + c.rating, 0);
    const avg = comments.length > 0 ? sum / comments.length : 0;
    const roundedAvg = Math.round(avg * 10) / 10;
    const updatedOffer = await this.offerModel.findByIdAndUpdate(
      offerId,
      {
        rating: roundedAvg,
      },
      { new: true }
    );
    console.log({ updatedOffer });
    return updatedOffer?.rating ?? 0;
  }

  public async create(
    offerId: string,
    dto: CreateCommentDTO
  ): Promise<DocumentType<CommentEntity>> {
    const newComment = await this.commentModel.create(dto);

    await this.offerModel.findByIdAndUpdate(offerId, {
      $push: { comments: newComment._id },
    });
    await this.updateOfferRating(offerId);
    // await this.incCommentCount(offerId);
    await this.offerModel;

    this.logger.info(
      `New comment created: ${newComment._id} to an offer ${offerId}`
    );
    return newComment;
  }
}
