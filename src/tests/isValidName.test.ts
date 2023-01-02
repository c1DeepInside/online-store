import { isValidName } from "../pages/cart-page/scripts/validation";

describe('isValidName', () => {
  it('there should be 2 or more than 2 words', () => {
    expect(isValidName('Kekov Lol Lulzov').valid).toEqual(true);
    expect(isValidName('Kekov Lol').valid).toEqual(true);
    expect(isValidName('Kekov').valid).toEqual(false);
    expect(isValidName('').valid).toEqual(false);
  });

  it('the length of each word must be more than 3 characters', () => {
    expect(isValidName('Kekov Lol Lulzov').valid).toEqual(true);
    expect(isValidName('Kekov Lo Lulzov').valid).toEqual(false);
    expect(isValidName('Kekov Lo Lu').valid).toEqual(false);
    expect(isValidName('Ke Lo Lu').valid).toEqual(false);
  })
})