import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointMapSelectPage } from './point-map-select.page';

describe('PointMapSelectPage', () => {
  let component: PointMapSelectPage;
  let fixture: ComponentFixture<PointMapSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointMapSelectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointMapSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
