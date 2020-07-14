import {AnimalClass} from './animal-class';

export class AnimalBreed {
  id: number;
  name: string;
  animalsClass: AnimalClass;

  constructor(id: number, name: string, animalsClass: AnimalClass) {
    this.id = id;
    this.name = name;
    this.animalsClass = animalsClass;
  }
}
