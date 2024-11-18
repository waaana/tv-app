import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatList, MatListItem } from '@angular/material/list';
import { TvShowData } from '../../../shared/tv-shows';

@Component({
  selector: 'app-tv-show-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    TranslateModule,
    MatList,
    MatListItem,
  ],
  templateUrl: './tv-show-dialog.component.html',
  styleUrl: './tv-show-dialog.component.scss',
})
export class TvShowDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: TvShowData
  ) {}
}
