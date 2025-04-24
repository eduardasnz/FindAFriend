import type { FastifyInstance } from "fastify"
import { authenticatedOrgsController } from "./orgs/authenticate-org"
import { registerOrgsController } from "./orgs/register-org"
import { NearbyOrgsController } from "./orgs/fetch-nearby-orgs"

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", registerOrgsController) // cadastro
  app.post("/sessions", authenticatedOrgsController) // login
  app.get("/orgs/nearby", NearbyOrgsController) // busca
}
