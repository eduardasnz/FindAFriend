import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaOrgRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from "../../../use-cases/orgs/authenticate-org";
import { VerifyJWT } from "../../middleware/verify-jwt";

export async function authenticatedOrgsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = bodySchema.parse(request.body);

  const orgsRepository = new PrismaOrgRepository();
  const authenticatedUseCase = new AuthenticateOrgUseCase(orgsRepository);

  try {
    const { org } = await authenticatedUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      {
        orgId: org.id,
      },
      {
        sign: {
          sub: org.id,
          expiresIn: "1d",
        },
      }
    );

    return reply.status(201).send({ token });
  } catch (error) {
    return reply.status(409).send({ message: "something wrong" });
  }
}