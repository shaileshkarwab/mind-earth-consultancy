import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportImageComponent } from './report-image.component';

describe('ReportImageComponent', () => {
  let component: ReportImageComponent;
  let fixture: ComponentFixture<ReportImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
