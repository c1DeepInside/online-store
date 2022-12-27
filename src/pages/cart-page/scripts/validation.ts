export function validation(): void {
  const name: HTMLInputElement = document.querySelector('#overlay__name')!;
  const phone: HTMLInputElement = document.querySelector('#overlay__phone')!;
  const address: HTMLInputElement = document.querySelector('#overlay__address')!;
  const email: HTMLInputElement = document.querySelector('#overlay__email')!;
  const credit: HTMLInputElement = document.querySelector('#credit__number')!;
  const validDate: HTMLInputElement = document.querySelector('#credit__date')!;
  const cvv: HTMLInputElement = document.querySelector('#credit__cvv')!;
  const confirm: HTMLButtonElement = document.querySelector('.overlay__confirm')!;

  confirm.addEventListener('click', (): void => {
    const valid = new Data(name, phone, address, email, credit, validDate, cvv);
    console.log(valid.isValid());
  });

  phone.addEventListener('input', (): void => {
    phone.value = phone.value.replace(/[^\+\d]/g, '');
  });

  email.addEventListener('input', (): void => {
    email.value = email.value.replace(/\s/g, '');
  })
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
    return isValidEmail(this.email);
  }
}


function isValidName(name: HTMLInputElement): boolean {
  const nameArr: string[] = name.value.split(' ');
  let valid: boolean = true;
  if (nameArr.length < 2) {
    valid = false;
  }
  nameArr.forEach(element => {
    if (element.length < 3) {
      valid = false;
    }
  });
  return valid;
}

function isValidPhone(phone: HTMLInputElement): boolean {
  const phoneText: string = phone.value;
  let valid: boolean = true;
  if (phoneText[0] !== '+') {
    valid = false;
  }
  if (phoneText.length < 9) {
    valid = false;
  }
  return valid;
}

function isValidAddress(address: HTMLInputElement): boolean {
  const addressArr: string[] = address.value.split(' ');
  let valid: boolean = true;
  if (addressArr.length < 3) {
    valid = false;
  }
  addressArr.forEach(element => {
    if (element.length < 5) {
      valid = false;
    }
  });
  return valid;
}

function isValidEmail(email: HTMLInputElement): boolean {
  const reg: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email.value);
}