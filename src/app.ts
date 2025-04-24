import fastify from "fastify";

import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { orgsRoutes } from "./http/controller/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(orgsRoutes);