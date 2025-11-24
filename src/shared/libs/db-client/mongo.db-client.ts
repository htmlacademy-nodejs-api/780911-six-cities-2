import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { DBClient } from './db-client.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../Logger/index.js';

@injectable()
export class MongoDbClient implements DBClient {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    private readonly mongoose: typeof Mongoose,
    private isConnected: boolean = false
  ) {}

  public isConnectedToDB() {
    return this.isConnected;
  }

  async connect(url: string): Promise<void> {
    try {
      if (this.isConnectedToDB()) {
        throw Error('already connected to MongoDB');
      }
      this.logger.info('Connecting to MongoDB');
      await this.mongoose.connect(url);
      this.isConnected = true;
      this.logger.info('MongoDB connected successfully');
    } catch (err) {
      this.logger.error('MongoDB connection error:', err as Error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (!this.isConnectedToDB()) {
        throw Error('already disconnected from MongoDB');
      }
      this.logger.info('Closing connection to MongoDB');
      await this.mongoose.disconnect?.();
      this.isConnected = false;
      this.logger.info('MongoDB connection closed successfully');
    } catch (err) {
      this.logger.error('MongoDB closing connection error:', err as Error);
    }
  }
}
