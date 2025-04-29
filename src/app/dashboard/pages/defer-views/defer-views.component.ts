import { Component } from '@angular/core';
import { HeavyLoadersSlowComponent } from '../../shared/heavy-loaders/heavy-loaders-slow.component';
import { HeavyLoadersFastComponent } from '../../shared/heavy-loaders/heavy-loaders-fast-component';
import { TitleComponent } from '../../shared/side-menu/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-defer-views',
  imports: [HeavyLoadersSlowComponent, CommonModule, HeavyLoadersFastComponent, TitleComponent ],
  templateUrl: './defer-views.component.html',
})
export class DeferViewsComponent { }
