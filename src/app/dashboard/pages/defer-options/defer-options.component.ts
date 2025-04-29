import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeavyLoadersFastComponent } from "@shared/heavy-loaders/heavy-loaders-fast-component";
import { TitleComponent } from "@shared/side-menu/title/title.component";

@Component({
  selector: 'app-defer-options',
  imports: [HeavyLoadersFastComponent, TitleComponent],
  templateUrl: './defer-options.component.html',
})
export class DeferOptionsComponent { }
