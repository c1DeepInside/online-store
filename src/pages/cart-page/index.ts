import './style.scss';

const buyButton: HTMLElement = <HTMLElement>document.querySelector('.summary_button');
const modalOverlay: HTMLElement = <HTMLElement>document.querySelector('.overlay_wrap');
const cross: HTMLElement = <HTMLElement>document.querySelector('.overlay__cross');
const overlay: HTMLElement = <HTMLElement>document.querySelector('.overlay');

buyButton.addEventListener('click', (): void => {
  modalOverlay.classList.add('active');
  overlay.classList.add('active_flex');
});

cross.addEventListener('click', closeOverlay);

modalOverlay.addEventListener('click',closeOverlay);

function closeOverlay(): void {
  modalOverlay.classList.remove('active');
  overlay.classList.remove('active_flex');
}