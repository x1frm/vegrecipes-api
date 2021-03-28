export const longStr = (length: number, substring = 'a'): string =>
  Array(length + 1).join(substring);

export const getHostname = (url: string): string => {
  const hostname = url.split('/')[2].split(':')[0].split('?')[0];
  return hostname;
};
