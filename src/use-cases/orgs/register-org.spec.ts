import { it, describe, beforeEach, expect } from "vitest";
import { InMemoryOrgRepository } from "../../repositories/in-memory/in-memory-respository";
import { RegisterOrgsUseCase } from "./register-orgs.use-case";

describe("Register Use Case test", () => {
  let orgsRepository: InMemoryOrgRepository;
  let sut: RegisterOrgsUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    sut = new RegisterOrgsUseCase(orgsRepository);
  });

  it("should be able to register a new org", async () => {
    const { org } = await sut.execute({
      name: "Centro de Adoações",
      author_name: "Marcio Luis",
      email: "centrodeadoces@ong.com",
      password: "0000000",
      whatsapp: "9199228302",
      cep: "91923992",
      city: "Salvador",
      state: "BA",
      neighborhood: "Centro",
      street: "Rua da Central",
      latitude: "1230221",
      longitude: "4560022",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not to be register with same email", async () => {
    const email = "duplicado@ong.com";

    await sut.execute({
      name: "Centro de Adoações",
      author_name: "Marcio Luis",
      email,
      password: "0000000",
      whatsapp: "9199228302",
      cep: "91923992",
      city: "Salvador",
      state: "BA",
      neighborhood: "Centro",
      street: "Rua da Central",
      latitude: "1230221",
      longitude: "4560022",
    });

    await expect(() =>
      sut.execute({
        name: "ONG 2",
        author_name: "Pedro",
        email,
        password: "outrasenha",
        whatsapp: "888888888",
        cep: "11111111",
        city: "Rio",
        state: "RJ",
        neighborhood: "Outro Bairro",
        street: "Rua 2",
        latitude: "30",
        longitude: "40",
      })
    ).rejects.toThrow();
  });
});
