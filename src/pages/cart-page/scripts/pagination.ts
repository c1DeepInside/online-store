let htmlProducts = document.querySelectorAll<HTMLDivElement>('.item_temp')!;
const itemPerPageHtml = document.querySelector<HTMLInputElement>('#item_per_page')!;
itemPerPageHtml.value = localStorage.getItem('pageNumbers') || '5';

const pageMinus = document.querySelector('.cart_page_minus_wrap')!;
const pagePlus = document.querySelector('.cart_page_plus_wrap')!;
const pageNumberHtml = document.querySelector('.cart_page_number')!;

let page = +pageNumberHtml.innerHTML;
let pageItems = +itemPerPageHtml.value;
let maxPage = Math.ceil(htmlProducts.length / pageItems);

export function performPagination() {
  htmlProducts = document.querySelectorAll<HTMLDivElement>('.item_temp')!;
  maxPage = Math.ceil(htmlProducts.length / pageItems);

  if (page > maxPage) {
    page = maxPage;
    pageNumberHtml.innerHTML = page.toString();
  }

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
  localStorage.setItem('pageNumbers', pageItems.toString());

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
