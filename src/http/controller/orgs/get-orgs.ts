import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetOrgsUseCase } from '../../../use-cases/fractories/makeGetOrgs'

export async function getOrgsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {

const routeSchema = z.object({
  id: z.string(),
})

  const { id } = routeSchema.parse(request.query)

  const getOrgsUseCase = makeGetOrgsUseCase()

  try {
    const { orgs } = await getOrgsUseCase.execute({ id })

    return reply.status(200).send(orgs)
  } catch (error) {
    if (error) {
      return reply.status(404).send({ message: "Pet Not Found" })
    }

    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}