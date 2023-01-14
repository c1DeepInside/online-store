import { changeView } from './changeView';

export let sortVariable = 0;

export function sortProducts() {
  changeView();

  const select: HTMLDivElement = document.querySelector('.select')!;
  const optionsWrap: HTMLDivElement = document.querySelector('.select__options_wrap')!;
  const selectPick: HTMLParagraphElement = document.querySelector('.select__pick')!;
  const selectArrow: HTMLParagraphElement = document.querySelector('.select__arrow')!;
  const options = document.querySelectorAll<HTMLDivElement>('.select__option')!;

  select.addEventListener('click', showOptions);
  document.addEventListener('click', hideOptions);

  let sorting = 'byPriceUp';

  const params = new URLSearchParams(window.location.search);

  for (const [key, value] of params.entries()) {
    if (key == 'sorting') {
      sorting = value;
    }
  }

  if (sortS.indexOf(sorting) === -1) {
    sorting = 'byPriceUp';
  }

  sortVariable = sortS.indexOf(sorting);

  selectPick.textContent = options[sortVariable].querySelector('.select__option__text')!.textContent;

  options.forEach((element) => {
    element.addEventListener('click', pickOption);
  });

  function showOptions() {
    optionsWrap.classList.toggle('active_flex');
  }

  function hideOptions(event: Event) {
    if (event.target !== select && event.target !== selectPick && event.target !== selectArrow) {
      optionsWrap.classList.remove('active_flex');
    }
  }

  function pickOption(this: HTMLDivElement) {
    const pick: HTMLParagraphElement = this.querySelector('.select__option__text')!;
    selectPick.textContent = pick.textContent;
    for (let i = 0; i < options.length; i++) {
      if (options[i] == this) {
        sortVariable = i;
      }
    }
  }
}

export const sortS: string[] = ['byPriceUp', 'byPriceDown', 'byStockUp', 'byStockDown'];
