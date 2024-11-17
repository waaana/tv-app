import { Component, input, output } from '@angular/core';
import { TvShowsGeneral } from '../../../shared/tv-shows';
import { ListItemContainerComponent } from '../list-item-container/list-item-container.component';

@Component({
  selector: 'app-list-items-container',
  standalone: true,
  imports: [ListItemContainerComponent],
  templateUrl: './list-items-container.component.html',
  styleUrl: './list-items-container.component.scss',
})
export class ListItemsContainerComponent {
  items = input<TvShowsGeneral[]>();
  itemClicked = output<TvShowsGeneral>();

  itemSelected(item: TvShowsGeneral) {
    this.itemClicked.emit(item);
  }
}
