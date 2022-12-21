export let sortVariable: number = 0; 

export function sortProducts(): void {
  const select: HTMLDivElement = document.querySelector('.select')!;
  const optionsWrap: HTMLDivElement = document.querySelector('.select__options_wrap')!;
  const selectPick: HTMLParagraphElement = document.querySelector('.select__pick')!;
  const selectArrow: HTMLParagraphElement = document.querySelector('.select__arrow')!;
  const options = document.querySelectorAll<HTMLDivElement>('.select__option')!;

  select.addEventListener('click', showOptions);
  document.addEventListener('click', hideOptions);

  options.forEach(element => {
    element.addEventListener('click', pickOption);
  });
 
  function showOptions(): void {
    optionsWrap.classList.toggle('active_flex');
  }

  function hideOptions(event: Event): void {
    if (event.target !== select && event.target !== selectPick && event.target !== selectArrow) {
      optionsWrap.classList.remove('active_flex');
    }
  }

  function pickOption(this: HTMLDivElement): void {
    const pick: HTMLParagraphElement = this.querySelector('.select__option__text')!;
    selectPick.textContent = pick.textContent;
    for (let i = 0; i < options.length; i++) {
      if (options[i] == this){
        sortVariable = i;
      }
    }
  }
}

