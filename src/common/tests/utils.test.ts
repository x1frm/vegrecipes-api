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
