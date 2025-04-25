import { Pet } from "@prisma/client";
import { PetsRepository } from "../../repositories/pets-repository";

interface RegisterPetsUseCaseRequest {
  id?: string
  name: string;
  age: string;
  race: string;
  org_id: string;
}

interface RegisterPetsUseCaseResponse {
  pets: Pet;
}

export class RegisterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    age,
    race,
    org_id,
  }: RegisterPetsUseCaseRequest): Promise<RegisterPetsUseCaseResponse> {

   const pets = await this.petsRepository.create({
    name,
    age,
    race,
    org_id,
   }) 

   return { pets };
  }  
}
