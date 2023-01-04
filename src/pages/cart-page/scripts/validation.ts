import { Cart } from "./cart";
import { ValidData, ErrorDes } from "./interfaces";

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

class Data implements ValidData {
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
    showErrors(this.address ,isValidAddress(this.address.value), 'nonCard');
    showErrors(this.name ,isValidName(this.name.value), 'nonCard');
    showErrors(this.phone ,isValidPhone(this.phone.value), 'nonCard');
    showErrors(this.email ,isValidEmail(this.email.value), 'nonCard');
    showErrors(this.credit ,isValidCredit(this.credit.value), 'card'); 
    showErrors(this.validDate ,isValidDate(this.validDate.value), 'card');
    showErrors(this.cvv ,isValidCVV(this.cvv.value), 'card');
    return isValidAddress(this.address.value).valid && isValidName(this.name.value).valid && isValidPhone(this.phone.value).valid && isValidEmail(this.email.value).valid 
    && isValidCredit(this.credit.value).valid && isValidCVV(this.cvv.value).valid && isValidDate(this.validDate.value).valid;
  }
}


export function isValidName(name: string): ErrorDes {
  const nameArr: string[] = name.split(' ');
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
  }

  return {'valid': valid, 'errors': error};
}

export function isValidPhone(phone: string): ErrorDes {
  const phoneText: string = phone;
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

  return {'valid': valid, 'errors': error};
}

export function isValidAddress(address: string): ErrorDes {
  const addressArr: string[] = address.split(' ');
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
  }

  return {'valid': valid, 'errors': error};
}

export function isValidEmail(email: string): ErrorDes {
  const reg: RegExp = /.+@.+\..+/i;
  let valid = reg.test(email);
  let error: string[] = [];
  if (!valid) {
    error.push('Must be an email');
  }
  
  return {'valid': valid, 'errors': error}; 
}

export function isValidCredit(credit: string): ErrorDes {
  let valid: boolean = credit.length >= 19;
  let error: string[] = [];
  if (!valid) {
    error.push('The number of digits in the entered card number must be exactly 16');
  }

  return {'valid': valid, 'errors': error};
}


export function isValidDate(date: string): ErrorDes {
  let valid: boolean = true;
  let error: string[] = [];
  if (date.length < 5) {
    valid = false;
    error.push('The length of date should be equal to 4');
  }
  if (date.length >= 2) {
    const month: number = Number(date.substring(0, 2));
    if (month > 12 || month < 1) {
      valid = false;
      error.push('The month in the date cannot be more than 12');
    }
  }

  return {'valid': valid, 'errors': error};
}

export function isValidCVV(cvv: string): ErrorDes {
  let valid = cvv.length === 3;
  let error: string[] = [];

  if (!valid) {
    error.push('The number of entered digits in the CVV should be exactly 3');
  }

  return {'valid': valid, 'errors': error};
}

function showErrors(input: HTMLInputElement, errorProp: ErrorDes, theme: string): void {
  if (!errorProp.valid) {
    input.classList.add('non_valid');

    if (!document.querySelector('.' + input.id + '_error')) {
      const inputError: HTMLParagraphElement = document.createElement('p');
      inputError.textContent = errorProp.errors.join(', ');
      inputError.classList.add('valid_error');
      inputError.classList.add(input.id + '_error');

      if (theme === 'card') {
        const overlayButton: HTMLButtonElement = document.querySelector('.overlay__confirm')!;
        overlayButton.parentNode?.insertBefore(inputError, overlayButton);
      } else {
        input.parentNode?.insertBefore(inputError, input.nextSibling);
      }
    }
  }
}