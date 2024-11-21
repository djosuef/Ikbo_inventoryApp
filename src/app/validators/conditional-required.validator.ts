import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function conditionalRequiredValidator(condition: () => boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (condition()) {
      return Validators.required(control) ? { 'required': true } : null;
    }
    return null;
  };
}