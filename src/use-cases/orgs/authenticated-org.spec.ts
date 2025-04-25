import { it, describe, beforeEach, expect } from "vitest";
import { InMemoryOrgRepository } from "../../repositories/in-memory/in-memory-respository";

import { hash } from "bcryptjs";
import { AuthenticateOrgUseCase } from "./authenticate-org.use-case";

describe("Authenticated Use Case test", () => {
  let orgsRepository: InMemoryOrgRepository;
  let sut: AuthenticateOrgUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);
  });

  it("should be able to authenticated a org", async () => {
    await orgsRepository.create({
      id: "org-1",
      name: "ONG Autenticada",
      author_name: "Duda",
      email: "duda@ong.com",
      password: await hash("123456", 6),
      whatsapp: "999999999",
      cep: "12345678",
      city: "Recife",
      state: "PE",
      neighborhood: "Boa Viagem",
      street: "Rua Sol",
      latitude: "1",
      longitude: "2",
    });

    const { org } = await sut.execute({
      email: "duda@ong.com",
      password: "123456",
    });

    expect(org.id).toEqual("org-1");
  });

  it("should not be able authenticated with wrong password", async () => {
    await orgsRepository.create({
      id: "org-02",
      name: "ONG Com Senha",
      author_name: "Carlos",
      email: "carlos@ong.com",
      password: await hash("senha-certa", 6),
      whatsapp: "888888888",
      cep: "00000000",
      city: "Fortaleza",
      state: "CE",
      neighborhood: "Aldeota",
      street: "Av Central",
      latitude: "3",
      longitude: "4",
    });

    await expect(() =>
      sut.execute({
        email: "carlos@ong.com",
        password: "senhaerradissima",
      })
    ).rejects.toThrow();
  });
});
