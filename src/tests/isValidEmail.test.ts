import { isValidEmail } from "../pages/cart-page/scripts/validation";

describe('isValidEmail', () => {
    it('email verification passed or not', () => {
      expect(isValidEmail('').valid).toEqual(false);
      expect(isValidEmail('grigoriy.com').valid).toEqual(false);
      expect(isValidEmail('grigoriy1xblack.dog.com').valid).toEqual(false);
      expect(isValidEmail('grigoriy1xXxxxxxxxxxxxxxxxxxxxxxxxxxxxXxxxxxxxxxxxxxxblack.dog@.com').valid).toEqual(false);
      expect(isValidEmail('gri goriy@.com').valid).toEqual(false);
      expect(isValidEmail('"Lookatallthesespaces!"@example.com').valid).toEqual(true);
      expect(isValidEmail('crutoyBober123@mail.ru').valid).toEqual(true);
      expect(isValidEmail('sobaca1247kkkd@gmail.com').valid).toEqual(true);
    });
  })