import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TvShowsGeneral } from '../../../shared/tv-shows';

@Component({
  selector: 'app-list-item-container',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './list-item-container.component.html',
  styleUrl: './list-item-container.component.scss',
})
export class ListItemContainerComponent {
  item = input.required<TvShowsGeneral>();
}