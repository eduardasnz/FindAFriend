import { Org } from "@prisma/client";
import { OrgsRepository } from "../../repositories/orgs-repository";

interface GetOrgsUseCaseRequest {
  id: string;
}

interface GetOrgsUseCaseResponse {
  orgs: Org;
}

export class GetorgsUseCase {
  constructor(private orgssRepository: OrgsRepository) {}

  async execute({ id }: GetOrgsUseCaseRequest): Promise<GetOrgsUseCaseResponse> {
    const orgs = await this.orgssRepository.findById(id);

    if (!orgs) {
      throw new Error("orgs not found");
    }

    return { orgs };
  }
}
