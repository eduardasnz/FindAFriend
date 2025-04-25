import type { FastifyInstance } from "fastify"
import { authenticatedOrgsController } from "./orgs/authenticate-org"
import { registerOrgsController } from "./orgs/register-org"
import { NearbyOrgsController } from "./orgs/fetch-nearby-orgs"
import { registerPetsController } from "./pets/register-pet"
import { FindPetsController } from "./pets/find-race-pet-by-race"
import { getOrgsController } from "./orgs/get-orgs"

export async function orgsRoutes(app: FastifyInstance) {
  // routes orgs
  app.post("/orgs", registerOrgsController) // cadastro
  app.post("/sessions", authenticatedOrgsController) // login
  app.get("/orgs/nearby", NearbyOrgsController) // busca
  app.get('/orgs', getOrgsController) // buscar por id

  // routes pets
  app.post('/pets', registerPetsController) // cadastro de pet
  app.get('/pets/race', FindPetsController) // buscando pet por race
}
