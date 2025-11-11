import path from 'node:path';

import { Command } from './command.interface.js';
import { TSVFileReader } from '../../lib/TSVFileReader/TSVFileReader.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...args: string[]) {
    try {
      if (args.length === 0) {
        throw new Error('No path for TSV file is provided');
      }

      const [fileArg] = args;
      const filePath = path.resolve(fileArg);

      const reader = new TSVFileReader(filePath);
      reader.read();
      console.log(reader.toOffersArray());
    } catch (error: unknown) {
      console.error('Failed to import file');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
