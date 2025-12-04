import { injectable, inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/Logger/index.js';

import { City, Component, SortType } from '../../types/index.js';

import {
  UpdateOfferDTO,
  OfferService,
  CreateOfferDTO,
  OfferEntity,
} from './index.js';
import { CommentEntity } from '../comment/index.js';

const enum OfferCount {
  Default = 60,
  Premium = 3,
}

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const offer = new OfferEntity(dto);

    const res = await this.offerModel.create(offer);
    this.logger.info(`New offer ${dto.title} created `);
    return res;
  }

  // add pagination, read about differnt types of pagiantions and pagination optimisation
  public async find(limit = OfferCount.Default) {
    return this.offerModel
      .find()
      .sort({ publicationDate: SortType.Down })
      .limit(limit)
      .populate('userId')
      .exec();
  }

  public async findById(offerId: string) {
    return this.offerModel.findById(offerId).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDTO) {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('userId')
      .exec();
  }

  public async deleteById(offerId: string) {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async findPremium(city: City, limit = OfferCount.Premium) {
    return this.offerModel
      .find({ city, premiumFlag: true })
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      .populate(['userId'])
      .exec();
  }

  public async findComments(offerId: string) {
    return this.commentModel.find({ offerId });
  }
}
