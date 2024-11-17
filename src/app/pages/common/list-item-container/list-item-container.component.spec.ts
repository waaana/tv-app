import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemContainerComponent } from './list-item-container.component';

describe('ListItemContainerComponent', () => {
  let component: ListItemContainerComponent;
  let fixture: ComponentFixture<ListItemContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
