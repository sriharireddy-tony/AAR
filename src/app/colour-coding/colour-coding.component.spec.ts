import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourCodingComponent } from './colour-coding.component';

describe('ColourCodingComponent', () => {
  let component: ColourCodingComponent;
  let fixture: ComponentFixture<ColourCodingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColourCodingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourCodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
