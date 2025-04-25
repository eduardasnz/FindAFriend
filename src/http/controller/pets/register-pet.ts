import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { RegisterPetsUseCase } from "../../../use-cases/pets/register-pets.use-case";

export async function registerPetsController(request: FastifyRequest, reply: FastifyReply) {
  
  const bodySchema = z.object({
    name: z.string(),
    race: z.string(),
    org_id: z.string(),
    age: z.string()
  })

  const data = bodySchema.parse(request.body);

  const petsRepository = new PrismaPetsRepository()
  const registerUseCase = new RegisterPetsUseCase(petsRepository)

  try {
    await registerUseCase.execute(data);
    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send({ message: "something wrong" })
  }
}