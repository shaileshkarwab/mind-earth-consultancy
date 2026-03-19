import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownActionComponent } from './drop-down-action.component';

describe('DropDownActionComponent', () => {
  let component: DropDownActionComponent;
  let fixture: ComponentFixture<DropDownActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDownActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
