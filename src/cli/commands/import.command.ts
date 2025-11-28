import path from 'node:path';
import dotenv from 'dotenv';
import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/TSVFileReader/index.js';
import {
  generateErrorMessage,
  getMongoURI,
  requireArgs,
  createMockOffer,
} from '../../shared/helpers/index.js';
import { Logger } from '../../shared/libs/Logger/index.js';
import { DBClient, MongoDbClient } from '../../shared/libs/db-client/index.js';
// import {
//   CreateOfferDTO,
//   DefaultOfferService,
//   OfferModel,
//   OfferService,
// } from '../../shared/modules/offer/index.js';
import {
  CreateUserDTO,
  UserService,
  DefaultUserService,
  UserModel,
} from '../../shared/modules/user/index.js';

dotenv.config();

export class ImportCommand implements Command {
  private dbClient: DBClient;
  // private offerService: OfferService;
  private salt!: string;
  private userService: UserService;

  // private async createOffer(dto: CreateOfferDTO) {
  //   const newOffer = await this.offerService.create(dto);
  //   this.logger.info(`Created Offer: ${JSON.stringify(newOffer)}`);
  //   return newOffer;
  // }

  private async findOrCreateUser(dto: CreateUserDTO) {
    const newUser = await this.userService.findOrCreate(dto, this.salt);
    this.logger.info(`Created User: ${JSON.stringify(newUser)}`);
    return newUser;
  }

  constructor(private logger: Logger) {
    this.dbClient = new MongoDbClient(this.logger);
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);
    this.userService = new DefaultUserService(this.logger, UserModel);
    // this.offerService = new DefaultOfferService(this.logger, OfferModel);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string) {
    const offerDTO = createMockOffer(line);
    console.log({ offerDTO });
    const user = await this.findOrCreateUser(offerDTO.user);
    console.log({ user });
    //TODO: add user to DB
    // TODO: add offer to DB
    // Copy from local test
    //const offer = await this.createOffer(offerDTO);
    //this.logger.info(JSON.stringify(offer));
  }

  private onCompleteImport(count: number) {
    this.logger.info(`${count} rows imported.`);
  }

  public async execute(
    fileArg: string,
    dbLogin: string,
    dbPassword: string,
    dbHost: string = 'localhost',
    dbPort: string = '27017',
    dbName: string,
    salt: string
  ) {
    try {
      requireArgs(this.logger, {
        fileArg,
        dbLogin,
        dbPassword,
        dbHost,
        dbPort,
        dbName,
      });
      this.salt = salt;
      const filePath = path.resolve(fileArg);

      const reader = new TSVFileReader(filePath);
      reader.on('line', this.onImportedLine);
      reader.on('end', this.onCompleteImport);
      reader.read();

      //const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${AUTH_DB}`;
      const uri = getMongoURI(dbLogin, dbPassword, dbHost, dbPort, dbName);

      await this.dbClient.connect(uri);
      this.logger.info(`✅ Connected to MongoDB! URI is ${uri}`);
    } catch (error: unknown) {
      generateErrorMessage(error, 'Failed to import file');
      if (error instanceof Error) {
        this.logger.error('Failed to import file', error);
      }
    }
  }
}
