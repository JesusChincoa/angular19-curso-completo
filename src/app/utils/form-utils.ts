import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep(){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors){
    for(const key of Object.keys(errors)){
      switch(key){
        case 'requiredTrue':
          return 'Se deben aceptar losTérminos y Condiciones de uso.'
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Mínimo de ${ errors['minlength'].requiredLength } caracteres`
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`
        case 'email':
          return 'El valor ingresado no es un correo electrónico'
        case 'pattern':
          if(errors['pattern'].requiredPattern === FormUtils.emailPattern){
            return 'El valor ingresado no es un correo electrónico'
          }
          return 'Error de patrón contra expresión regular'
        case 'emailExist':
          return 'El correo electrónico ya está en uso'
        case 'notStrider':
          return 'El nombre de usuario strider está reservado'
        default:
          return `Error no controlado tipo ${key}`
      }
    }
    return null
  }

  static isValidField(form: FormGroup, fieldName: string): boolean| null {
    return(!!form.controls[fieldName].errors && form.touched)
  }

  static getFieldError(form:FormGroup, fieldName:string): string|null{
        if (!form.controls[fieldName]) return null;
    
        const errors = form.controls[fieldName].errors ?? {};
    
        return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray:FormArray, index:number): boolean | null {
        return(
          formArray.controls[index].errors && formArray.controls[index].touched
        );
  }

  static getFieldErrorInArray(formArray:FormArray, index:number): string | null{
    if(!formArray.controls[index]) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }
  
  static isFieldOneEqualsFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }

  static async checkingServerRespose(control:AbstractControl): Promise<ValidationErrors | null> {
    console.log('Validando en el servidor...');
    
    await sleep();

    const formValue = control.value;
    if(formValue === 'hola@mundo.com'){
      return { emailExist: true };
    }


    return null;
  }

  static notStrider(control:AbstractControl): ValidationErrors | null {
    const formValue = control.value;
    if(formValue === 'strider'){
      return { notStrider: true };
  }
  return  null;
  }
}