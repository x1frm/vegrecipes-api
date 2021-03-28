import faker from 'faker';
import * as utils from '../utils';

describe('longStr', () => {
  it("returns a long string filled with 'a' by default", () => {
    const result = utils.longStr(10);
    const expected = 'aaaaaaaaaa';

    expect(result).toBe(expected);
  });

  it('returns a long string filled with custom pattern', () => {
    const result = utils.longStr(5, 'Hi');
    const expected = 'HiHiHiHiHi';

    expect(result).toBe(expected);
  });
});

describe('getHostname', () => {
  it('returns a hostname from full url', () => {
    const urls = [
      'https://support.google.com/analytics/answer/1033867?hl=en',
      'https://laravel.com/docs/8.x/urls',
      'https://ga-dev-tools.appspot.com/campaign-url-builder/',
      'https://symfony.com/doc/4.1/console/request_context.html',
      'https://symfonycasts.ru/screencast/symfony/generate-urls',
      'http://example.com?param=value',
      'http://websitename.com:1234/dir/file.txt',
    ];

    const expected = [
      'support.google.com',
      'laravel.com',
      'ga-dev-tools.appspot.com',
      'symfony.com',
      'symfonycasts.ru',
      'example.com',
      'websitename.com',
    ];

    urls.forEach((url, idx) => {
      const received = utils.getHostname(url);
      expect(received).toBe(expected[idx]);
    });
  });
});
