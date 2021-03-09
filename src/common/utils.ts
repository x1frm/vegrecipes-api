export const LongStr = (length: number, substring = 'a'): string =>
  Array(length + 1).join(substring);
