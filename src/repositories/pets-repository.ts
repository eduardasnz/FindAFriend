import { Pet } from "@prisma/client";

export interface CreatePetsData {
  id?: string;
  name: string;
  age: string;
  race: string;
  org_id: string;
}

export interface PetsRepository {
  create(data: CreatePetsData): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findByRace(race: string): Promise<Pet[]>;
}
