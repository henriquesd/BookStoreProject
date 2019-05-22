/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GenderListComponent } from './gender-list.component';

describe('GenderListComponent', () => {
  let component: GenderListComponent;
  let fixture: ComponentFixture<GenderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
