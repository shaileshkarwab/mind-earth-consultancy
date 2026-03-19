import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfReportsComponent } from './list-of-reports.component';

describe('ListOfReportsComponent', () => {
  let component: ListOfReportsComponent;
  let fixture: ComponentFixture<ListOfReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
