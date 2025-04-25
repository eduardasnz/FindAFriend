import { PrismaOrgRepository } from '../../repositories/prisma/prisma-orgs-repository'
import { GetorgsUseCase } from '../orgs/get-org.use-case'

export function makeGetOrgsUseCase() {
  return new GetorgsUseCase(new PrismaOrgRepository())
}