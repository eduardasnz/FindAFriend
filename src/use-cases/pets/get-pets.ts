import type { Pet } from "@prisma/client"
import type { PetsRepository } from "../../repositories/pets-repository"

interface GetPetUseCaseRequest {
  id: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new Error("Pet not found")
    }

    return { pet }
  }
}