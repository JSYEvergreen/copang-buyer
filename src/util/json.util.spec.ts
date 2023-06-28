import { removeUndefinedKey } from './json.util';

describe('json util 테스트', () => {
  test('undefiend 키 삭제하기', () => {
    const testJson = {
      temp1: 'test',
      temp2: undefined,
    };

    const result = removeUndefinedKey(testJson);

    expect(result.temp2).not.toBeDefined();
    expect(result.temp2).toBeUndefined();
  });
});
