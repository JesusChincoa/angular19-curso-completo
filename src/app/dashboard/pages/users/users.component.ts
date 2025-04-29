import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/side-menu/title/title.component';

@Component({
  imports: [CommonModule, TitleComponent, RouterModule],
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent {

  public usersService = inject( UsersService )


}