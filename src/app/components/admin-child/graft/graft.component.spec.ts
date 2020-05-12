import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraftComponent } from './graft.component';

describe('GraftComponent', () => {
  let component: GraftComponent;
  let fixture: ComponentFixture<GraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
