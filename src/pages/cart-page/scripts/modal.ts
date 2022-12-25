export function setupCheckoutModal() {
  const buyButton = document.querySelector<HTMLElement>('.summary_button')!;
  const modalOverlay = document.querySelector<HTMLElement>('.overlay_wrap')!;
  const cross = document.querySelector<HTMLElement>('.overlay__cross')!;
  const overlay = document.querySelector<HTMLElement>('.overlay')!;

  buyButton.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    overlay.classList.add('active_flex');
  });

  cross.addEventListener('click', closeOverlay);
  modalOverlay.addEventListener('click', closeOverlay);

  function closeOverlay() {
    modalOverlay.classList.remove('active');
    overlay.classList.remove('active_flex');
  }
}

