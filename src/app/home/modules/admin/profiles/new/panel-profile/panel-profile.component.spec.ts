import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProfileComponent } from './panel-profile.component';

describe('PanelProfileComponent', () => {
  let component: PanelProfileComponent;
  let fixture: ComponentFixture<PanelProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
