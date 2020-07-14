export class AnimalBreedCreate {
  animalClassId: number;
  name: string;

  constructor(animalClassId: number, name: string) {
    this.animalClassId = animalClassId;
    this.name = name;
  }
}
