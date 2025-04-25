import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindByRacePetUseCase } from "../../../use-cases/fractories/makeFindByPets";

export async function FindPetsController(request: FastifyRequest, reply: FastifyReply) {
  
  const bodySchema = z.object({
    race: z.string(),
  })

  const { race } = bodySchema.parse(request.query);

  const findPetsUseCase = makeFindByRacePetUseCase()
   
  try {
    const { pets } = await findPetsUseCase.execute({
      race,
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}