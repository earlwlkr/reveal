import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function processCsv(input: string) {
  const items = input
    .trim()
    .split('\n')
    .map((line, index) => {
      const fields = line.split(',').map((i) => i.trim());
      return {
        id: index,
        name: fields[1],
        dept: fields[2],
      };
    });
  return items;
}
