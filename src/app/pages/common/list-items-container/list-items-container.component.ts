import { Component, computed, input, output, Signal } from '@angular/core';
import { ListItemContainerComponent } from '../list-item-container/list-item-container.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonEntertainmentData } from '../../../shared/model/shared.model';

@Component({
  selector: 'app-list-items-container',
  standalone: true,
  imports: [ListItemContainerComponent, TranslateModule],
  templateUrl: './list-items-container.component.html',
  styleUrl: './list-items-container.component.scss',
})
export class ListItemsContainerComponent {
  isLastItem = input<boolean | undefined>(false);
  isRetrievingList = input<boolean | undefined>(false);
  items = input<CommonEntertainmentData[]>();
  itemsPresent: Signal<boolean> = computed(() => {
    return Boolean(this.items() && this.items()?.length);
  });
  itemClicked = output<CommonEntertainmentData>();

  itemSelected(item: CommonEntertainmentData) {
    this.itemClicked.emit(item);
  }
}
