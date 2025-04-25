import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaOrgRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { FetchNearbyOrgsUseCase } from "../../../use-cases/orgs/fetch-nearby-orgs"; 

export async function NearbyOrgsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const querySchema = z.object({
    latitude: z.string(),
    longitude: z.string(),
  });

  const { latitude, longitude } = querySchema.parse(request.query);

  const orgsRepository = new PrismaOrgRepository();
  const nearbyOrgsUseCase = new FetchNearbyOrgsUseCase(orgsRepository);

 const { orgs } = await nearbyOrgsUseCase.execute({ userLatitude: latitude, userLongitude: longitude })

 return reply.status(200).send({ orgs })

}