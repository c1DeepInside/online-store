import { Product } from "../data/interfaces";
import { sortData } from "../pages/index/scripts/sortData";

describe('isValidCVV', () => {
  const product1: Product = {
    "id": 1,
    "title": "Adult Sterilized Dry Cat Food Sterile with Lamb",
    "description": "Wellkiss Sterilized food for neutered and sterilized cats with lamb is a complete, balanced diet for adult cats. The composition of the diet includes all the components necessary for the health of the cat. The feed does not contain wheat, thus reducing the risk of allergic reactions.",
    "price": 3899,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 23,
    "brand": "Adult Sterilized",
    "category": "Cat food",
    "thumbnail": "https://4lapy.ru/resize/480x480/upload/iblock/cf6/cf604af5f62886f0698380fb639f8356.jpg",
    "images": [
      "https://4lapy.ru/resize/480x480/upload/iblock/cf6/cf604af5f62886f0698380fb639f8356.jpg",
      "https://4lapy.ru/resize/480x480/upload/iblock/4b5/4b565c35463a3170c042be5ebadbc622.jpg",
      "https://4lapy.ru/resize/480x480/upload/iblock/3ad/3adc1a72ade1ef3bea768291b3114436.jpg",
    ]
  }

  const product2: Product = {
    "id": 2,
    "title": "Adult Sterilized Ultra dry food for sterilized cats, with turkey",
    "description": "OFNA ULTRA. STERILIZED is a balanced diet for adult sterilized cats and neutered cats, produced in Spain. The feed is based on the maximum amount of natural ingredients: fresh meat, whole grains, fresh vegetables and fruits, as well as algae, which allows you to convey to your pet the benefits of products in the form in which nature intended.",
    "price": 1549,
    "discountPercentage": 12.96,
    "rating": 4.29,
    "stock": 13,
    "brand": "Adult Sterilized",
    "category": "Cat food",
    "thumbnail": "https://4lapy.ru/resize/480x480/upload/iblock/641/641b5478cd6a0e045c29a70fcd1ce2e4.jpg",
    "images": [
      "https://4lapy.ru/resize/480x480/upload/iblock/641/641b5478cd6a0e045c29a70fcd1ce2e4.jpg",
      "https://4lapy.ru/resize/480x480/upload/iblock/684/6849b317160b7b9dcf42c5d093b55a27.jpg",
      "https://4lapy.ru/resize/480x480/upload/iblock/c3c/c3c6923ea2d809d7ec5b43c27b6dcfe2.jpg",
    ]
  }

  const product3: Product = {
    "id": 3,
    "title": "Sterilized 37 dry food for sterilized cats from 1 to 7 years old",
    "description": "Royal Canin's diets for kittens are divided according to the stage of growth – from birth to adulthood. What unites these products is high calorie content and protein level, adapted–high level of minerals for the formation of bone structure, prebiotics and excellent digestibility of ingredients for comfortable digestion, maintaining immunity, due to antioxidants, and much more.",
    "price": 1555,
    "discountPercentage": 11.96,
    "rating": 3.69,
    "stock": 43,
    "brand": "Royal Canin",
    "category": "Cat food",
    "thumbnail": "https://4lapy.ru/resize/480x480/upload/iblock/8c3/8c36a7ebcd21122d890daf283237956c.jpg",
    "images": [
      "https://4lapy.ru/resize/480x480/upload/iblock/8c3/8c36a7ebcd21122d890daf283237956c.jpg",
      "https://4lapy.ru/resize/480x480/upload/iblock/e63/e6334e58c88ce235f4508296f65d0827.jpg",
      "https://4lapy.ru/resize/480x480/upload/iblock/073/073f3b199dd9ac8c2a3ce285d713fb3d.jpg",
    ]
  }

  const products1: Product[] = [product1, product2, product3];
  const products2: Product[] = [product1, product2];

  it('should sort by price up', () => {
    expect(sortData(products1, 0)).toEqual([product2, product3, product1]);
    expect(sortData(products2, 0)).toEqual([product2, product1]);
  });

  it('should sort by price down', () => {
    expect(sortData(products1, 1)).toEqual([product1, product3, product2]);
    expect(sortData(products2, 1)).toEqual([product1, product2]);
  });

  it('should sort by stock up', () => {
    expect(sortData(products1, 2)).toEqual([product2, product1, product3]);
    expect(sortData(products2, 2)).toEqual([product2, product1]);
  });

  it('should sort by stock down', () => {
    expect(sortData(products1, 3)).toEqual([product3, product1, product2]);
    expect(sortData(products2, 3)).toEqual([product1, product2]);
  });
})