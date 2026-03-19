import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCategoryComponent } from './list-of-category.component';

describe('ListOfCategoryComponent', () => {
  let component: ListOfCategoryComponent;
  let fixture: ComponentFixture<ListOfCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
