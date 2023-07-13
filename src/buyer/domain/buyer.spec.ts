import { formattingPhoneNumber } from './buyer';

describe('domain buyer.ts 테스트', () => {
  describe('phoneNumber 포메팅 함수 테스트', () => {
    test('하이픈 제거된 형태로 성공적으로 반환한 경우', () => {
      const result = formattingPhoneNumber('010-1234 5678');
      expect(result).toEqual(expect.not.stringContaining('-'));
    });

    test('띄어쓰기 제거된 형태로 성공적으로 반환한 경우', () => {
      const result = formattingPhoneNumber('010 1234 5678');
      expect(result).toEqual(expect.not.stringContaining(' '));
    });

    test('띄어쓰기와 하이픈이 혼합되어 성공적으로 제거된 경우 ', () => {
      const result = formattingPhoneNumber('010 1234-5678');
      expect(result).toEqual(expect.not.stringContaining(' '));
      expect(result).toEqual(expect.not.stringContaining('-'));
    });
  });
});
