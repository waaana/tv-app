import { Component, output, OnInit, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, filter, tap } from 'rxjs';
import { QueryDetails } from '../../../shared/model/shared.model';

@Component({
  selector: 'app-search-items',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './search-items.component.html',
  styleUrl: './search-items.component.scss',
})
export class SearchItemsComponent implements OnInit {
  initialSearch = input<QueryDetails | null | undefined>();
  initiateSearch = output<string>();
  searchChange = output<string | null>();
  public searchFC = new FormControl('', {});
  public searchForm = new FormGroup({ search: this.searchFC });

  ngOnInit() {
    this.searchFC.setValue(this.initialSearch()?.searchQuery ?? '');
    this.searchFC.valueChanges
      .pipe(
        tap(searchQuery => this.searchChange.emit(searchQuery)),
        debounceTime(1000),
        filter(searchQuery => Boolean(!searchQuery || searchQuery.length > 2))
      )
      .subscribe(searchQuery => {
        this.initiateSearch.emit(searchQuery as string);
      });
  }
}
