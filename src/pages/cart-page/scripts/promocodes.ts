import { promos } from '../../../data/codes';

export function addPromocodes(input: HTMLInputElement) {
  const addPromo: HTMLDivElement = document.querySelector('.add-promocodes')!;
  const dropPromo: HTMLDivElement = document.querySelector('.drop-promocodes')!;
  console.log(input)
  if (input.value in promos) {
    const key = input.value as keyof typeof promos;

    const addItem = document.createElement('div');
    addItem.classList.add('add-item');
    addItem.innerHTML = `${key} - ${promos[key]}%`;
    addPromo.appendChild(addItem);
  
    const addBtn = document.createElement('div');
    addBtn.classList.add('add-button');
    addBtn.innerHTML = `ADD`;
    addItem.appendChild(addBtn);

    addBtn.addEventListener('click', () => {
      addPromo.removeChild(addItem);
      dropPromo.appendChild(addItem);
      addBtn.innerHTML = `DROP`;
    });
  }
}