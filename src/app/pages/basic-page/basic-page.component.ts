import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { single } from 'rxjs';
import { AvailableLocal, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe,
  ],
  templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent { 

  localeService = inject(LocaleService)
  // currentLocale = signal(inject(LOCALE_ID)) Se puede usar también para obtener el local actual

  nameLower = signal('jesus');
  nameUpper = signal('JESUS');
  fullName = signal('jeSUs cHinCOa');

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() =>{
      this.customDate.set(new Date)
    }, 1000);

  onCleanup(() =>{
    clearInterval(interval)
  })
});

changeLocal(locale: AvailableLocal){
  console.log({locale})
  this.localeService.changeLocal(locale)
}

}
