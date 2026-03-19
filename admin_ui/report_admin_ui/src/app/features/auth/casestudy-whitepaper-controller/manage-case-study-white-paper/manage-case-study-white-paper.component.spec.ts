import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCaseStudyWhitePaperComponent } from './manage-case-study-white-paper.component';

describe('ManageCaseStudyWhitePaperComponent', () => {
  let component: ManageCaseStudyWhitePaperComponent;
  let fixture: ComponentFixture<ManageCaseStudyWhitePaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCaseStudyWhitePaperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCaseStudyWhitePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
