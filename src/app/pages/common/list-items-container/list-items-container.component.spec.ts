import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsContainerComponent } from './list-items-container.component';

describe('ListItemsContainerComponent', () => {
  let component: ListItemsContainerComponent;
  let fixture: ComponentFixture<ListItemsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
