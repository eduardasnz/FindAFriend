import { Org } from '@prisma/client'
import { OrgsRepository } from '../../repositories/orgs-repository' 

interface FetchNearbyOrgsUseCaseRequest {
  userLatitude: string
  userLongitude: string
}

interface FetchNearbyOrgsUseCaseResponse {
  orgs: Org[]
}

export class FetchNearbyOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyOrgsUseCaseRequest): Promise<FetchNearbyOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: Number(userLatitude),
      longitude: Number(userLongitude)
    })

    return {
      orgs, 
    }
  }
}