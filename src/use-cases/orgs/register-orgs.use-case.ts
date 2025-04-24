import { hash } from "bcryptjs";
import { OrgsRepository } from "../../repositories/orgs-repository";
import type { Org } from "@prisma/client";

interface RegisterOrgsUseCaseRequest {
  name: string;
  author_name: string;
  email: string;
  whatsapp: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: string;
  longitude: string;
}

interface RegisterOrgsUseCaseResponse {
  org: Org;
}

export class RegisterOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: RegisterOrgsUseCaseRequest): Promise<RegisterOrgsUseCaseResponse> {
    const orgAlreadyExist = await this.orgsRepository.findByEmail(email);

    if (orgAlreadyExist) {
      throw new Error("Org Already Exists");
    }

    const password_hash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      name,
      author_name,
      email,
      whatsapp,
      password: password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    });

    return { org };
  }
}
