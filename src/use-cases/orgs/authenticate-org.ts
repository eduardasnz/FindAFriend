import { OrgsRepository } from "../../repositories/orgs-repository" 
import { Org } from "@prisma/client"
import { compare } from "bcryptjs"

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ email, password }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new Error("Invalid credentials.")
    }

    const doesPasswordMatch = await compare(password, org.password)

    if (!doesPasswordMatch) {
      throw new Error("Invalid credentials.")
    }

    return { org }
  }
}
