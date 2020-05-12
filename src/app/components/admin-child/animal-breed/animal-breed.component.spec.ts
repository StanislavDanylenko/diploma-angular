import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalBreedComponent } from './animal-breed.component';

describe('AnimalBreedComponent', () => {
  let component: AnimalBreedComponent;
  let fixture: ComponentFixture<AnimalBreedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalBreedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
