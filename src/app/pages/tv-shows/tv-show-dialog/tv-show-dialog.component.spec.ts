import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowDialogComponent } from './tv-show-dialog.component';

describe('TvShowDialogComponent', () => {
  let component: TvShowDialogComponent;
  let fixture: ComponentFixture<TvShowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
