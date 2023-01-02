import { isValidCVV } from "../pages/cart-page/scripts/validation";

describe('isValidCVV', () => {
  it('the length should be exactly 3', () => {
    expect(isValidCVV('666').valid).toEqual(true);
    expect(isValidCVV('66').valid).toEqual(false);
    expect(isValidCVV('6666').valid).toEqual(false);
    expect(isValidCVV('').valid).toEqual(false);
  });
})