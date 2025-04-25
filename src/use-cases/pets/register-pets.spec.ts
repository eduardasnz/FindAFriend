import { it, describe, beforeEach, expect } from "vitest";
import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-repository-pets";
import { RegisterPetsUseCase } from "./register-pets.use-case";
import { randomUUID } from "crypto";


describe('Register Pets', () => {
  let petsRepository: InMemoryPetsRepository;
  let sut: RegisterPetsUseCase;

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new RegisterPetsUseCase(petsRepository);
  });

  it('should be able to register a pet', async () => {
    const { pets } = await sut.execute({
      id: randomUUID(),
      name: "Lexie",
      age: "3",
      race: "shih tzu",
      org_id: "42f44d57-3647-4e98-be79-39a6272ec227"
    })

    expect(pets.id).toEqual(expect.any(String))
  })
})
