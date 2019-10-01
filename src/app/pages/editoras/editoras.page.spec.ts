import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorasPage } from './editoras.page';

describe('EditorasPage', () => {
  let component: EditorasPage;
  let fixture: ComponentFixture<EditorasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
