import { Org } from "@prisma/client";
import { OrgsRepository, CreateOrgData, FindManyNearbyParams } from "../orgs-repository";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-between-coordines";

export class InMemoryOrgRepository implements OrgsRepository {
  public items: Org[] = [];
  
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams): Promise<Org[]> {
    return this.items.filter((org) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        { latitude: Number(org.latitude), longitude: Number(org.longitude) }
      )

      return distance < 10 // km
    })
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);
    return org ?? null;
  }

  async create(data: CreateOrgData) {
    const org: Org = {
      id: randomUUID(),
      ...data,
    };

    this.items.push(org);

    return org;
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);
    return org ?? null;
  }
}
