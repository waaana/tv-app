import { Component, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonEntertainmentData } from '../../../shared/model/shared.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
          '500ms ease-in-out',
          style({
            transform: 'translateY(0)',
            opacity: 1,
          })
        ),
      ]),
    ]),
    trigger('mouseInteraction', [
      state(
        'mouseleave',
        style({
          border: '1px solid transparent',
        })
      ),
      state(
        'mouseenter',
        style({
          border: '1px solid',
        })
      ),
      transition('mouseleave <=> mouseenter', animate('300ms ease-out')),
    ]),
    trigger('mouseInteractionImg', [
      state('mouseleave', style({ margin: '0' })),
      state('mouseenter', style({ margin: '5px' })),
      transition('mouseleave <=> mouseenter', animate('2s ease-out')),
    ]),
  ],
})
export class ListItemContainerComponent {
  mouseInteraction = signal<'mouseenter' | 'mouseleave'>('mouseleave');
  item = input.required<CommonEntertainmentData>();

  onMouseEnter() {
    this.mouseInteraction.set('mouseenter');
  }

  onMouseLeave() {
    this.mouseInteraction.set('mouseleave');
  }
}
