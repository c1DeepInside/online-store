import { isValidPhone } from '../pages/cart-page/scripts/validation';

describe('isValidPhone', () => {
  it('the length should be more than 9', () => {
    expect(isValidPhone('+375296073494666').valid).toEqual(true);
    expect(isValidPhone('+375296073494').valid).toEqual(true);
    expect(isValidPhone('+3752960').valid).toEqual(false);
  });

  it('the first character should be a plus', () => {
    expect(isValidPhone('+375296073494').valid).toEqual(true);
    expect(isValidPhone('375296073494666').valid).toEqual(false);
    expect(isValidPhone('375296073494').valid).toEqual(false);
    expect(isValidPhone('3752960666666').valid).toEqual(false);
  });
});
