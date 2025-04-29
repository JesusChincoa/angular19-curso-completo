import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent { 

  private fb = inject(FormBuilder)

  formUtils = FormUtils

  myForm:FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)], [FormUtils.checkingServerRespose]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern), FormUtils.notStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required]
  }, {
    validators: [
      this.formUtils.isFieldOneEqualsFieldTwo('password', 'password2')
    ],
  });

  // isFieldOneEqualsFieldTwo(field1: string, field2: string) {
  //   return (formGroup: AbstractControl) => {
  //     const field1Value = formGroup.get(field1)?.value;
  //     const field2Value = formGroup.get(field2)?.value;

  //     return field1Value === field2Value ? null : { passwordsNotEqual: true };
  //   };
  // }

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
    } 

}
