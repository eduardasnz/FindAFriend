import { PrismaClient } from "@prisma/client";
import {
  OrgsRepository,
  CreateOrgData,
  type FindManyNearbyParams,
} from "../orgs-repository";

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

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const latitudeStr = String(latitude);
    const longitudeStr = String(longitude);

    const orgs = await prisma.org.findMany({
      where: {
        latitude: { equals: latitudeStr },
        longitude: { equals: longitudeStr },
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
