import { PrismaClient } from "@prisma/client";
import { OrgsRepository, CreateOrgData } from "../orgs-repository";

const prisma = new PrismaClient();

export class PrismaOrgRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }

  async findManyNearby(city: string, state: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city,
        state,
      },
    });

    return orgs;
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: { email },
    });

    return org;
  }

  async create(data: CreateOrgData) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}
