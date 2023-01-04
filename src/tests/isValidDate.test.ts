import { isValidDate } from "../pages/cart-page/scripts/validation";

describe('isValidDate', () => {
    it('the length should be exactly 5 and date of the month should not be more than 12', () => {
      expect(isValidDate('12/88').valid).toEqual(true);
      expect(isValidDate('66').valid).toEqual(false);
      expect(isValidDate('66/66').valid).toEqual(false);
      expect(isValidDate('').valid).toEqual(false);
      expect(isValidDate('12/23').valid).toEqual(true);
      expect(isValidDate('01/09').valid).toEqual(true);
      expect(isValidDate('10/25').valid).toEqual(true);
    });
  })