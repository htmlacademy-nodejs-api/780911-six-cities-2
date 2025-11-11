import fs from 'node:fs';
import path from 'node:path';

import { Command } from './command.interface.js';

type PackageJSONConfig = {
  version: string;
};

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = path.resolve(
      process.cwd(),
      'package.json'
    )
  ) {}

  public getName() {
    return '--version';
  }

  private readVersion() {
    const file = fs.readFileSync(this.filePath, 'utf8');
    const parsed = JSON.parse(file);
    if (!isPackageJSONConfig(parsed)) {
      throw new Error('Failed to parse json content.');
    }

    return parsed.version;
  }

  public async execute(..._args: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      if (!version) {
        throw new Error('no package file');
      }

      console.log(version);
    } catch (error: unknown) {
      console.error('Failed to read version from package.json');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
const test = new VersionCommand();

test.execute();
