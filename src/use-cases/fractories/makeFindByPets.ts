import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { GetPetByRaceUseCase } from '../pets/find-pet-by-race'

export function makeFindByRacePetUseCase() {
  return new GetPetByRaceUseCase(new PrismaPetsRepository())
}