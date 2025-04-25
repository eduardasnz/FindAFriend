import { PrismaClient, Pet } from "@prisma/client";
import { PetsRepository, CreatePetsData } from "../pets-repository";

const prisma = new PrismaClient();

export class PrismaPetsRepository implements PetsRepository {
  async findByRace(race: string) {
    const findRace = await prisma.pet.findMany({
      where: {
        race,
      },
    });

    return findRace;
  }

  async create(data: CreatePetsData) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: { id },
    });

    return pet;
  }
}
