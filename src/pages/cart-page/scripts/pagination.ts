const params: URLSearchParams = new URLSearchParams(window.location.search);

let currItemPerPage = '';
let currPage = '';

for (const [key, value] of params.entries()) {
  if (key == 'ItemsPerPage') {
    currItemPerPage = value;
  }

  if (key == 'Page') {
    currPage = value;
    if (Number(currPage) < 1) {
      currPage = '1';
    }
  }
}

let htmlProducts = document.querySelectorAll<HTMLDivElement>('.item_temp')!;
const itemPerPageHtml = document.querySelector<HTMLInputElement>('#item_per_page')!;
itemPerPageHtml.value = currItemPerPage || '5';

const pageMinus = document.querySelector('.cart_page_minus_wrap')!;
const pagePlus = document.querySelector('.cart_page_plus_wrap')!;
const pageNumberHtml = document.querySelector('.cart_page_number')!;

let page = Number(currPage) || 1;

pageNumberHtml.textContent = page.toString();

let pageItems = +itemPerPageHtml.value;
let maxPage = Math.ceil(htmlProducts.length / pageItems);

export function performPagination() {
  htmlProducts = document.querySelectorAll<HTMLDivElement>('.item_temp')!;
  maxPage = Math.ceil(htmlProducts.length / pageItems);

  if (page > maxPage) {
    page = maxPage;
    pageNumberHtml.innerHTML = page.toString();
  }

  params.set('ItemsPerPage', pageItems.toString());
  params.set('Page', page.toString());
  window.history.replaceState({}, '', '?' + params.toString());

  htmlProducts.forEach((product, idx) => {
    const from = pageItems * (page - 1);
    const to = from + pageItems - 1;

    if (idx < from || idx > to) {
      product.style.display = 'none';
    } else {
      product.style.display = 'flex';
    }
  });
}

itemPerPageHtml.addEventListener('input', () => {
  let count = +itemPerPageHtml.value;

  if (count < 1) {
    count = 1;
  }

  itemPerPageHtml.value = count.toString();
  pageItems = count;

  params.set('ItemsPerPage', pageItems.toString());
  window.history.replaceState({}, '', '?' + params.toString());

  maxPage = Math.ceil(htmlProducts.length / pageItems);
  performPagination();
});

pageMinus.addEventListener('click', () => {
  if (page - 1 <= 0) {
    return;
  }

  page -= 1;
  performPagination();

  pageNumberHtml.innerHTML = page.toString();
});

pagePlus.addEventListener('click', () => {
  if (page + 1 > maxPage) {
    return;
  }

  page += 1;
  performPagination();

  pageNumberHtml.innerHTML = page.toString();
});
