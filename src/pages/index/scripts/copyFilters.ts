export function copyFilters() {
  const btn: HTMLButtonElement = document.querySelector('.filters__btn')!;
  btn.addEventListener('click', (): void => {
    btn.innerText = 'Filters copied!';
    btn.disabled = true;
    setTimeout((): void => {
      btn.innerText = 'Copy Filters';
      btn.disabled = false;
    }, 1000);
    if(navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    } else {
      console.log('Browser Not compatible');
    }
  })
}