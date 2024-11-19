import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MovieData } from '../../../shared/movies/model/movies.model';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, TranslateModule],
  templateUrl: './movie-dialog.component.html',
  styleUrl: './movie-dialog.component.scss',
})
export class MovieDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: MovieData
  ) {}
}
