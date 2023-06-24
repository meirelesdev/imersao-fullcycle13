import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class WalletsService {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly prismaService: PrismaService) { }

  all() {
    return this.prismaService.wallet.findMany();
  }
  create(input: { id: string }) {
    return this.prismaService.wallet.create({
      data: {
        id: input.id,
      },
    });
  }
}
