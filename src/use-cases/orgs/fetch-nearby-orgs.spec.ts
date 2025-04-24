import { describe, it, expect, beforeEach } from "vitest"
import { FetchNearbyOrgsUseCase } from "./fetch-nearby-orgs" 
import { InMemoryOrgRepository } from "../../repositories/in-memory/in-memory-respoitory"

let orgsRepository: InMemoryOrgRepository
let sut: FetchNearbyOrgsUseCase

describe("Fetch Nearby Orgs Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    sut = new FetchNearbyOrgsUseCase(orgsRepository)
  })

  it('should be able fetch nearby orgs', async () => {
    await orgsRepository.create({
      name: "ONG Perto",
      author_name: "Duda",
      email: "perto@ong.com",
      password: "123456",
      whatsapp: "999999999",
      cep: "11111111",
      city: "Recife",
      state: "PE",
      neighborhood: "Boa Viagem",
      street: "Rua A",
      latitude: "-8.047562",
      longitude: "-34.877001",
    })

    await orgsRepository.create({
      name: "ONG outra Perto",
      author_name: "Duda2",
      email: "perto2@ong.com",
      password: "12322456",
      whatsapp: "99999229999",
      cep: "11111111",
      city: "Recife",
      state: "PE",
      neighborhood: "Boa Viagem",
      street: "Rua A",
      latitude: "-98.047559",
      longitude: "-49.877000",
    })

    await orgsRepository.create({
      name: "ONG Longe",
      author_name: "João",
      email: "longe@ong.com",
      password: "123456",
      whatsapp: "888888888",
      cep: "22222222",
      city: "São Paulo",
      state: "SP",
      neighborhood: "Centro",
      street: "Rua B",
      latitude: "-23.550520",
      longitude: "-46.633308",
    })

    const { orgs } = await sut.execute({
      userLatitude: -8.047562,
      userLongitude: -34.877001,
    })
    
    expect(orgs).toHaveLength(1)
    expect(orgs[0].name).toEqual("ONG Perto")
  })
})