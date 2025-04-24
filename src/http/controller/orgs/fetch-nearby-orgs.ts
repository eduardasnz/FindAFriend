import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaOrgRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { NearbyOrgUseCase } from "../../../use-cases/orgs/fetch-nearby-orgs";

export async function NearbyOrgsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const querySchema = z.object({
    city: z.string(),
    state: z.string(),
  });

  const { city, state } = querySchema.parse(request.query);

  const orgsRepository = new PrismaOrgRepository();
  const nearbyOrgsUseCase = new NearbyOrgUseCase(orgsRepository);

 const { orgs } = await nearbyOrgsUseCase.execute({ city, state })

 return reply.status(200).send({ orgs })

}