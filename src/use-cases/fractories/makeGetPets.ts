import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '../pets/get-pets' 

export function makeGetPetUseCase() {
  return new GetPetUseCase(new PrismaPetsRepository())
}