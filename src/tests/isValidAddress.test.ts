import { isValidAddress } from "../pages/cart-page/scripts/validation";

describe('isValidAddress', () => {
  it('there should be 3 or more than 3 words', () => {
    expect(isValidAddress('Street Pushkina Number Kolotushkina').valid).toEqual(true);
    expect(isValidAddress('Street Pushkina Russia').valid).toEqual(true);
    expect(isValidAddress('Street Pushkina').valid).toEqual(false);
    expect(isValidAddress('').valid).toEqual(false);
  });

  it('the length of each word must be more than 5 characters', () => {
    expect(isValidAddress('Street Pushkina Number Kolotushkina').valid).toEqual(true);
    expect(isValidAddress('Street Pushkina Number 12').valid).toEqual(false);
    expect(isValidAddress('Street Lol Number Kolotushkina').valid).toEqual(false);
  })
})