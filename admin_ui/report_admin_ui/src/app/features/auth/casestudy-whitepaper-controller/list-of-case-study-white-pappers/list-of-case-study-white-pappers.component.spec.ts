import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCaseStudyWhitePappersComponent } from './list-of-case-study-white-pappers.component';

describe('ListOfCaseStudyWhitePappersComponent', () => {
  let component: ListOfCaseStudyWhitePappersComponent;
  let fixture: ComponentFixture<ListOfCaseStudyWhitePappersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfCaseStudyWhitePappersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfCaseStudyWhitePappersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
