import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent { 

  private fb = inject(FormBuilder)
  formUtils = FormUtils

  myForm: FormGroup = this.fb.group({
    name:['',[Validators.required, Validators.minLength(2)]],
    favouriteGames: this.fb.array([['Pokémon', Validators.required], ['LoL', Validators.required]],Validators.minLength(4)),
  })

  newFavourite = new FormControl('', Validators.required);
  // newFavourite = this.fb.control([])

  get favouriteGames(){
    return this.myForm.get('favouriteGames') as FormArray;
  }

  isValidFieldInArray(formArray:FormArray, index:number){
    return(
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  onAddToFavourites(){
    if (this.newFavourite.invalid) return;

    const newGame = this.newFavourite.value;

    this.favouriteGames.push(this.fb.control(newGame, Validators.required))

    this.newFavourite.reset();
  }

  onDeleteFavourite(index:number){
    this.favouriteGames.removeAt(index);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
