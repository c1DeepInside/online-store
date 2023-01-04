import { itemsFound } from "../pages/index/scripts/itemsFound";

describe('number of products found', () => {
	beforeEach(() => {
		document.body.innerHTML = `
				<div class="catalog__goods"></div>
				<p class="found__text">
						Found: <span class="found__number">0</span>
				</p>
		`;
	});

	it('shoud correctly display no products', () => {
		itemsFound([]);

		const foundText: HTMLSpanElement = document.querySelector('.found__number')!;
		const catalog: HTMLSpanElement = document.querySelector('.catalog__goods')!;

		expect(foundText.textContent).toEqual('0');
		expect(catalog.innerHTML).toEqual('No products found');
		expect(Array.from(catalog.classList)).toContain('no-found');
	});
	it('', () => {
		itemsFound([
			{
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
			},
			{
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
			},
			{
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
			},
			{
				"id": 4,
				"title": "Nutri Savour wet food for adult sterilized cats and neutered cats, with chicken in sauce",
				"description": "For an adult medium-weight cat (4 kg), 3 sachets per day are required, divided into two feedings. Feeding recommendations that allow you to maintain an ideal shape may vary depending on the age of the animal, its activity and environmental conditions.",
				"price": 85,
				"discountPercentage": 7.96,
				"rating": 4.99,
				"stock": 56,
				"brand": "Pro Plan",
				"category": "Wet Cat Food",
				"thumbnail": "https://4lapy.ru/resize/480x480/upload/iblock/54a/54afc2794f106a39a8c79592b3f36306.jpg",
				"images": [
					"https://4lapy.ru/resize/480x480/upload/iblock/54a/54afc2794f106a39a8c79592b3f36306.jpg",
					"https://4lapy.ru/resize/480x480/upload/iblock/63e/63eeb88e0a32d4c0f45a70eb6c1abb4e.jpg",
					"https://4lapy.ru/resize/480x480/upload/iblock/f79/f793b034e7f1ee9a33461e15c6ada734.jpg",
				]
			},
			{
				"id": 5,
				"title": "Sterilized wet food for sterilized cats in jelly",
				"description": "Royal Canin Sterilized is a wet food for neutered and sterilized cats older than 1 year. Sterilized wet food helps to maintain the health of the urinary system of sterilized cats. Ideal weight of a sterilized cat Maintaining the ideal weight of a cat Sterilized food helps to maintain the ideal weight of a sterilized cat thanks to precisely selected energy content. An instinctive preference for a sterilized cat An instinctive preference for an optimal ratio of proteins, fats and carbohydrates contributes to the long-term preservation of the taste appeal of the feed. A special macronutrient profile.",
				"price": 74,
				"discountPercentage": 12.96,
				"rating": 4.39,
				"stock": 61,
				"brand": "Royal Canin",
				"category": "Wet Cat Food",
				"thumbnail": "https://4lapy.ru/resize/480x480/upload/iblock/07c/07c61829765c7e75376e5c9c8bade05b.jpg",
				"images": [
					"https://4lapy.ru/resize/480x480/upload/iblock/07c/07c61829765c7e75376e5c9c8bade05b.jpg",
					"https://4lapy.ru/resize/480x480/upload/iblock/8fd/8fd6e966f430efa052e024101e1b76b0.jpg",
					"https://4lapy.ru/resize/480x480/upload/iblock/5de/5defeff1beb1e8d74a914efb2239ae7c.jpg",
				]
			},
			{
				"id": 6,
				"title": "Kitten wet food for kittens from 4 to 12 months pieces in sauce",
				"description": "Royal Canin Sterilized is a wet food for neutered and sterilized cats older than 1 year. Sterilized wet food helps to maintain the health of the urinary system of sterilized cats. Ideal weight of a sterilized cat Maintaining the ideal weight of a cat Sterilized food helps to maintain the ideal weight of a sterilized cat thanks to precisely selected energy content. An instinctive preference for a sterilized cat An instinctive preference for an optimal ratio of proteins, fats and carbohydrates contributes to the long-term preservation of the taste appeal of the feed. A special macronutrient profile.",
				"price": 77,
				"discountPercentage": 10.46,
				"rating": 4.09,
				"stock": 34,
				"brand": "Royal Canin",
				"category": "Wet Cat Food",
				"thumbnail": "https://4lapy.ru/resize/480x480/upload/iblock/2df/2df4abe94e65582ff54e3a74f50f4843.jpg",
				"images": [
					"https://4lapy.ru/resize/480x480/upload/iblock/2df/2df4abe94e65582ff54e3a74f50f4843.jpg",
					"https://4lapy.ru/resize/480x480/upload/iblock/e8e/e8e69002a6ea583f3ea6b53a90efc5d1.jpg",
					"https://4lapy.ru/resize/480x480/upload/iblock/49a/49accf03adcda287f2a034cabbe6bd8f.jpg",
				]
			}]);

		const foundText: HTMLSpanElement = document.querySelector('.found__number')!;
		const catalog: HTMLSpanElement = document.querySelector('.catalog__goods')!;

		expect(foundText.textContent).toEqual('6');
		expect(Array.from(catalog.classList)).not.toBe('no-found');
	})
})