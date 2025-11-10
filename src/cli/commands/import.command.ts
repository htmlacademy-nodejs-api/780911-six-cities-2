import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public execute() {
    console.log('Execute call');
  }
}
