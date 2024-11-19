import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonEntertainmentData } from '../../../shared/model/shared.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-list-item-container',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './list-item-container.component.html',
  styleUrl: './list-item-container.component.scss',
  animations: [
    trigger('shake', [
      transition(':enter', [
        style({ transform: 'rotate(0)' }),
        animate('0.1s', style({ transform: 'rotate(2deg)' })),
        animate('0.1s', style({ transform: 'rotate(-2deg)' })),
        animate('0.1s', style({ transform: 'rotate(2deg)' })),
        animate('0.1s', style({ transform: 'rotate(0)' })),
      ]),
    ]),
  ],
})
export class ListItemContainerComponent {
  item = input.required<CommonEntertainmentData>();
}
