import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxProfileComponent } from './checkbox-profile.component';

describe('CheckboxProfileComponent', () => {
  let component: CheckboxProfileComponent;
  let fixture: ComponentFixture<CheckboxProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
