export interface ValidData {
  readonly name: HTMLInputElement;
  readonly phone: HTMLInputElement;
  readonly address: HTMLInputElement;
  readonly email: HTMLInputElement;
  readonly credit: HTMLInputElement;
  readonly validDate: HTMLInputElement;
  readonly cvv: HTMLInputElement;
}

export interface ErrorDes {
  valid: boolean,
  errors: string[]
}