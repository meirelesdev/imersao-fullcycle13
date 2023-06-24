import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class AssetsService {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly prismaService: PrismaService) { }

  all() {
    return this.prismaService.asset.findMany();
  }

  create(data: { id: string; symbol: string; price: number }) {
    return this.prismaService.asset.create({ data });
  }
}
