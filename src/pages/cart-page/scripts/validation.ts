import { Cart } from "./cart";

export function validation(cart: Cart): void {
  const name: HTMLInputElement = document.querySelector('#overlay__name')!;
  const phone: HTMLInputElement = document.querySelector('#overlay__phone')!;
  const address: HTMLInputElement = document.querySelector('#overlay__address')!;
  const email: HTMLInputElement = document.querySelector('#overlay__email')!;
  const credit: HTMLInputElement = document.querySelector('#credit__number')!;
  const validDate: HTMLInputElement = document.querySelector('#credit__date')!;
  const cvv: HTMLInputElement = document.querySelector('#credit__cvv')!;
  const confirm: HTMLButtonElement = document.querySelector('.overlay__confirm')!;

  const inputsArr: HTMLInputElement[] = [name, phone, address, email, credit, validDate, cvv];

  inputsArr.forEach(element => {
    element.addEventListener('click', removeError);
  });

  confirm.addEventListener('click', (): void => {
    const valid = new Data(name, phone, address, email, credit, validDate, cvv);
     
    if (valid.isValid()) {
      closeModal();
      cart.clear();
      setTimeout((): void => {
        window.location.replace('index.html');
      }, 3000);   
    }
  });

  phone.addEventListener('input', (): void => {
    phone.value = phone.value.replace(/[^\+\d]/g, '');
  });

  email.addEventListener('input', (): void => {
    email.value = email.value.replace(/\s/g, '');
  });

  credit.addEventListener('input', (): void => {
    let cardNumber: string = credit.value.replace(/\D/g, '');  
    if (cardNumber !== '') {
      credit.value = cardNumber.match(/.{1,4}/g)!.join(' ');
    } else {
      credit.value = '';
    }
    credit.value = credit.value.substring(0, 19);

    if (credit.value.length <= 1) {
      changeSystem(credit.value);
    }
  });

  validDate.addEventListener('input', (): void => {
    let date: string = validDate.value.replace(/\D/g, '');
    if (date !== '') {
      validDate.value = date.match(/.{1,2}/g)!.join('/');
    } else {
      validDate.value = '';
    }
    validDate.value = validDate.value.substring(0, 5);
  })

  cvv.addEventListener('input', (): void => {
    cvv.value = cvv.value.replace(/\D/g, '');
    cvv.value = cvv.value.substring(0, 3);
  })


  function removeError(this: HTMLInputElement): void {
    this.classList.remove('non_valid');

    if (document.querySelector('.' + this.id + '_error')) {
      const error: HTMLParagraphElement = document.querySelector('.' + this.id + '_error')!;
      error.remove();
    }
  }
}

function closeModal(): void {
  const overlay: HTMLDivElement = document.querySelector('.overlay')!; 
  const overlayWrap: HTMLDivElement = document.querySelector('.overlay_wrap')!; 
  overlay.classList.remove('active_flex');

  let sec: number = 3;
  const overlayRedirect: HTMLDivElement = document.createElement('div');
  overlayRedirect.classList.add('overlay__redirect');
  overlayRedirect.innerText = 'Thanks for your order. Redirect to the store ' + sec.toString();
  overlayWrap.appendChild(overlayRedirect);

  setInterval(() => {
    sec -= 1;
    overlayRedirect.innerText = 'Thanks for your order. Redirect to the store ' + sec.toString();
  }, 1000);
}

function changeSystem(credit: string): void {
  const system: HTMLSpanElement = document.querySelector('.credit__system')!;
  const overlay: HTMLDivElement = document.querySelector('.overlay__credit')!;

  system.classList.remove('credit__visa');
  system.classList.remove('credit__american');
  system.classList.remove('credit__master');

  overlay.classList.remove('overlay__credit_visa');
  overlay.classList.remove('overlay__credit_master');
  overlay.classList.remove('overlay__credit_american');
  

  if (credit[0] === '4') {
    system.classList.add('credit__visa');
    overlay.classList.add('overlay__credit_visa');
  } else if (credit[0] === '3') {
    system.classList.add('credit__american');
    overlay.classList.add('overlay__credit_american');
  } else if (credit[0] === '5') {
    system.classList.add('credit__master');
    overlay.classList.add('overlay__credit_master');
  }
}


interface validData {
  readonly name: HTMLInputElement;
  readonly phone: HTMLInputElement;
  readonly address: HTMLInputElement;
  readonly email: HTMLInputElement;
  readonly credit: HTMLInputElement;
  readonly validDate: HTMLInputElement;
  readonly cvv: HTMLInputElement;
}

class Data implements validData {
  name: HTMLInputElement;
  phone: HTMLInputElement;
  address: HTMLInputElement;
  email: HTMLInputElement;
  credit: HTMLInputElement;
  validDate: HTMLInputElement;
  cvv: HTMLInputElement;

  constructor(name: HTMLInputElement, phone: HTMLInputElement, address: HTMLInputElement, email: HTMLInputElement, credit: HTMLInputElement, validDate: HTMLInputElement, cvv: HTMLInputElement ) {
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.email = email;
    this.credit = credit;
    this.validDate = validDate;
    this.cvv = cvv;
  }

  isValid(): boolean {    
    isValidAddress(this.address);
    isValidName(this.name);
    isValidPhone(this.phone);
    isValidEmail(this.email);
    isValidCredit(this.credit); 
    isValidCVV(this.cvv);
    isValidDate(this.validDate);
    return isValidAddress(this.address) && isValidName(this.name) && isValidPhone(this.phone) && isValidEmail(this.email) 
    && isValidCredit(this.credit) && isValidCVV(this.cvv) && isValidDate(this.validDate);
  }
}


function isValidName(name: HTMLInputElement): boolean {
  const nameArr: string[] = name.value.split(' ');
  let valid: boolean = true;
  let error: string[] = [];
  if (nameArr.length < 2) {
    valid = false;
    error.push('Contains at least two words');
  }
  for (let i = 0; i < nameArr.length; i++){
    if (nameArr[i].length < 3) {
      valid = false;
      error.push('The length of each word is at least 3 characters');
      break;
    }
  };

  if (!valid) {
    name.classList.add('non_valid');

    if (!document.querySelector('.overlay__name_error')) {
      const nameError: HTMLParagraphElement = document.createElement('p');
      nameError.textContent = error.join(', ');
      nameError.classList.add('valid_error');
      nameError.classList.add('overlay__name_error');

      name.parentNode?.insertBefore(nameError, name.nextSibling);
    }
  }
  return valid;
}

function isValidPhone(phone: HTMLInputElement): boolean {
  const phoneText: string = phone.value;
  let valid: boolean = true;
  let error: string[] = [];
  if (phoneText[0] !== '+') {
    valid = false;
    error.push('Must start with "+"');
  }
  if (phoneText.length < 9) {
    valid = false;
    error.push('Must be at least 9 characters long');
  }
  if (!valid) {
    phone.classList.add('non_valid');

    if (!document.querySelector('.overlay__phone_error')) {
      const phoneError: HTMLParagraphElement = document.createElement('p');
      phoneError.textContent = error.join(', ');
      phoneError.classList.add('valid_error');
      phoneError.classList.add('overlay__phone_error');

      phone.parentNode?.insertBefore(phoneError, phone.nextSibling);
    }
  }
  return valid;
}

function isValidAddress(address: HTMLInputElement): boolean {
  const addressArr: string[] = address.value.split(' ');
  let valid: boolean = true;
  let error: string[] = [];
  if (addressArr.length < 3) {
    valid = false;
    error.push('Contains at least three words');
  }
  for (let i = 0; i < addressArr.length; i++) {
    if (addressArr[i].length < 5) {
      valid = false;
      error.push('The length of each word is at least 5 characters');
      break;
    }
  };
  if (!valid) {
    address.classList.add('non_valid');

    if (!document.querySelector('.overlay__address_error')) {
      const addressError: HTMLParagraphElement = document.createElement('p');
      addressError.textContent = error.join(', ');
      addressError.classList.add('valid_error');
      addressError.classList.add('overlay__address_error');

      address.parentNode?.insertBefore(addressError, address.nextSibling);
    }
  }
  return valid;
}

function isValidEmail(email: HTMLInputElement): boolean {
  const reg: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let valid = reg.test(email.value);
  let error: string[] = [];
  if (!valid) {
    email.classList.add('non_valid');
    error.push('Must be an email');

    if (!document.querySelector('.overlay__email_error')) {
      const emailError: HTMLParagraphElement = document.createElement('p');
      emailError.textContent = error.join(', ');
      emailError.classList.add('valid_error');
      emailError.classList.add('overlay__email_error');

      email.parentNode?.insertBefore(emailError, email.nextSibling);
    }
  }
  return valid; 
}

function isValidCredit(credit: HTMLInputElement): boolean {
  let valid: boolean = credit.value.length >= 19;
  let error: string[] = [];
  if (!valid) {
    credit.classList.add('non_valid');
    error.push('The number of digits in the entered card number must be exactly 16');

    if (!document.querySelector('.credit__number_error')) {
      const creditError: HTMLParagraphElement = document.createElement('p');
      creditError.textContent = error.join(', ');
      creditError.classList.add('valid_error');
      creditError.classList.add('credit__number_error');

      const overlayButton: HTMLButtonElement = document.querySelector('.overlay__confirm')!;
      overlayButton.parentNode?.insertBefore(creditError, overlayButton);
    }
  }
  return valid;
}


function isValidDate(date: HTMLInputElement): boolean {
  let valid: boolean = true;
  let error: string[] = [];
  if (date.value.length < 5) {
    valid = false;
    error.push('The length of date should be equal to 4');
  }
  if (date.value.length >= 2) {
    const month: number = Number(date.value.substring(0, 2));
    if (month > 12 || month < 1) {
      valid = false;
      error.push('The month in the date cannot be more than 12');
    }
  }
  if (!valid) {
    date.classList.add('non_valid');

    if (!document.querySelector('.credit__date_error')) {
      const dateError: HTMLParagraphElement = document.createElement('p');
      dateError.textContent = error.join(', ');
      dateError.classList.add('valid_error');
      dateError.classList.add('credit__date_error');

      const overlayButton: HTMLButtonElement = document.querySelector('.overlay__confirm')!;
      overlayButton.parentNode?.insertBefore(dateError, overlayButton);
    }
  }
  return valid;
}

function isValidCVV(cvv: HTMLInputElement): boolean {
  let valid = cvv.value.length >= 3;
  let error: string[] = [];
  if (!valid) {
    cvv.classList.add('non_valid');
    error.push('The number of entered digits in the CVV should be exactly 3');

    if (!document.querySelector('.credit__cvv_error')) {
      const cvvError: HTMLParagraphElement = document.createElement('p');
      cvvError.textContent = error.join(', ');
      cvvError.classList.add('valid_error');
      cvvError.classList.add('credit__cvv_error');

      const overlayButton: HTMLButtonElement = document.querySelector('.overlay__confirm')!;
      overlayButton.parentNode?.insertBefore(cvvError, overlayButton);
    }
  }
  return valid;
}