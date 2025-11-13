import chalk from 'chalk';

export const generateErrorMessage = (error: unknown, message: string) => {
  console.error(chalk.red(message));

  if (error instanceof Error) {
    console.error(chalk.red(error.message));
  }
};

export const generateRandomValue = (
  min: number,
  max: number,
  numAfterDigit = 0
) => +(Math.random() * (max - min) + min).toFixed(numAfterDigit);

export const getRandomItems = <T>(items: T[]): T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition =
    startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
};

export const getRandomItem = <T>(items: T[]): T =>
  items[generateRandomValue(0, items.length - 1)];

export const getDaysAgo = (daysAgo: number): Date => {
  const today = new Date();

  const nDaysAgo = new Date(today);
  nDaysAgo.setUTCDate(today.getUTCDate() - Math.floor(daysAgo));

  return nDaysAgo;
};

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);
