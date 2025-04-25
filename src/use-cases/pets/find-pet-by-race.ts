import type { Pet } from "@prisma/client"
import type { PetsRepository } from "../../repositories/pets-repository"

interface GetPetUseCaseRequest {
  race: string
}

interface GetPetUseCaseResponse {
  pets: Pet[]
}

export class GetPetByRaceUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ race }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pets = await this.petsRepository.findByRace(race)

    if (!pets) {
      throw new Error("Pet not found")
    }

    return { pets } 
  }
}