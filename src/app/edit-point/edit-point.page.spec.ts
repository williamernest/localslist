import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPointPage } from './edit-point.page';

describe('EditPointPage', () => {
  let component: EditPointPage;
  let fixture: ComponentFixture<EditPointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPointPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
