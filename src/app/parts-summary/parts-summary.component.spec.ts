import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsSummaryComponent } from './parts-summary.component';

describe('PartsSummaryComponent', () => {
  let component: PartsSummaryComponent;
  let fixture: ComponentFixture<PartsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
