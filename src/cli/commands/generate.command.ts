import axios from 'axios';

import { generateErrorMessage } from '../../helpers/index.js';
import { OfferGenerator } from '../../lib/OfferGenerator/index.js';
import { Command } from './command.interface.js';
import { MockServerData } from '../../types/mockServerData.js';

export class GenerateCommand implements Command {
  private rawData = {} as MockServerData;
  private static readonly MOCK_API_URL = 'http://localhost:4000/api';

  public getName() {
    return '--generate';
  }

  private async getData(APIURL: string) {
    try {
      const response = await axios.get(APIURL || GenerateCommand.MOCK_API_URL);
      console.log(response.data);
      this.rawData = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  public async execute(...args: string[]): Promise<void> {
    try {
      console.log('generate called', { args });
      if (args.length === 0) {
        throw new Error('No args are provided');
      }

      const [amount, outputPath, url] = args;
      const offerAmount = Number.parseInt(amount, 10);

      await this.getData(url);
      const offerGenerator = new OfferGenerator(this.rawData);
      const offer = offerGenerator.generate();
      console.log({ offerAmount, outputPath });
      console.log({ offer });
    } catch (error: unknown) {
      generateErrorMessage(error, 'Failed to generate mock TSV file');
    }
  }
}

//TODO: generate n offers
//TODO: pass args to generate offers
//TODO: error handling + try catch guarding, errors catchers
//TODO: update import command call to work with big files
