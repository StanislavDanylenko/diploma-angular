import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalGraftsComponent } from './animal-grafts.component';

describe('AnimalGraftsComponent', () => {
  let component: AnimalGraftsComponent;
  let fixture: ComponentFixture<AnimalGraftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalGraftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalGraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
