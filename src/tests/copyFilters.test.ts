import { copyFilters } from "../pages/index/scripts/copyFilters";

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:8080/?priceMin=299&priceMax=3899&StockMin=3&StockMax=51&search=&categories=Dog+Clothes%2CCat+food&view=tiles&sorting=byPriceUp'
  },
});

describe('copylink with filters', () => {
  beforeEach(() => {
    document.body.innerHTML = `
				<button class="filters__btn">Copy Filters</button>
		`;
    
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers()
  });

  jest.spyOn(navigator.clipboard, "writeText");

  it('on click button', () => {
    copyFilters();
    const btn: HTMLButtonElement = document.querySelector('.filters__btn')!;
    btn.click();

    jest.spyOn(global, 'setTimeout');

    expect(btn.innerText).toEqual('Filters copied!');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);
    
    jest.runAllTimers();
    expect(btn.innerText).toEqual('Copy Filters');
  });
})