import { Pet } from "@prisma/client";
import { randomUUID } from "crypto";
import { CreatePetsData, type PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    return pet ?? null;
  }

  async findByRace(race: string) {
    const pets = this.items.filter(
      (item) => item.race.toLowerCase() === race.toLowerCase()
    );

    return pets;
  }

  async create(data: CreatePetsData) {
    const pets: Pet = {
      id: randomUUID(),
      ...data,
    };

    this.items.push(pets);

    return pets ?? null;
  }
}
