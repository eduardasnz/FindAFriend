import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaOrgRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { RegisterOrgsUseCase } from "../../../use-cases/orgs/register-orgs.use-case";

export async function registerOrgsController(request: FastifyRequest, reply: FastifyReply) {
  
  const bodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string().min(6),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.string(),
    longitude: z.string(),
  })

  const data = bodySchema.parse(request.body);

  const orgsRepository = new PrismaOrgRepository()
  const registerUseCase = new RegisterOrgsUseCase(orgsRepository)

  try {
    await registerUseCase.execute(data);
    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send({ message: "something wrong" })
  }
}