import { Org, Prisma } from '@prisma/client';

export interface CreateOrgData {
  id?: string
  name: string
  author_name: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: string
  longitude: string
}

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface OrgsRepository {
  findByEmail(email: string): Promise<Org | null>
  create(data: CreateOrgData): Promise<Org>
  findManyNearby({ latitude, longitude }: FindManyNearbyParams): Promise<Org[]>
  findById(id: string): Promise<Org | null>
}