import { isValidCVV } from "../pages/cart-page/scripts/validation";

describe('isValidCVV', () => {
  it('the length should be exactly three', () => {
    expect(isValidCVV('666').valid).toEqual(true);
  });
})