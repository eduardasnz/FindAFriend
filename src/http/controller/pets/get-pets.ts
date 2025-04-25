import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetUseCase } from '../../../use-cases/fractories/makeGetPets'

export async function getPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {

const routeSchema = z.object({
  id: z.string(),
})

  const { id } = routeSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  try {
    const { pet } = await getPetUseCase.execute({ id })

    return reply.status(200).send(pet)
  } catch (error) {
    if (error) {
      return reply.status(404).send({ message: "Pet Not Found" })
    }

    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}