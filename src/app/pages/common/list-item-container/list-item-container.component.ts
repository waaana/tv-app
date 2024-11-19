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
    trigger('appear', [
      transition(':enter', [
        style({
          transform: 'translateY(-10%)',
          opacity: 0,
        }),
        animate(
          '.5s ease-in-out',
          style({
            transform: 'translateY(0)',
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class ListItemContainerComponent {
  item = input.required<CommonEntertainmentData>();
}
