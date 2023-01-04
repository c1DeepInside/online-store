import { isValidCredit } from "../pages/cart-page/scripts/validation";

  describe('isValidCredit', () => {
    it('the length should be exactly 16', () => {
      expect(isValidCredit('3223 1533 3531 3532').valid).toEqual(true);
      expect(isValidCredit('1444 4444 4444').valid).toEqual(false);
      expect(isValidCredit('1234 7800').valid).toEqual(false);
      expect(isValidCredit('').valid).toEqual(false);
      expect(isValidCredit('6453 6709 1223 6655').valid).toEqual(true);
      expect(isValidCredit('2882 5567 3531 3008').valid).toEqual(true);
    });
  })