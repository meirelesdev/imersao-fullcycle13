import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import {
  ExecuteTransactionMessage,
  InitTransactionDto,
  InputExecuteTransactionDto,
} from "./order.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("wallets/:wallet_id/orders")
export class OrdersController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  all(@Param("wallet_id") wallet_id) {
    return this.ordersService.all({ wallet_id });
  }

  @Post()
  initTransactionDto(
    @Param("wallet_id") wallet_id,
    @Body() body: Omit<InitTransactionDto, "wallet_id">,
  ) {
    return this.ordersService.initTransaction({ ...body, wallet_id });
  }

  @Post("execute")
  executeTransaction(
    @Param("wallet_id") wallet_id,
    @Body() body: InputExecuteTransactionDto,
  ) {
    return this.ordersService.executeTransaction(body);
  }

  @MessagePattern("output")
  async executeTransactionConsumer(
    @Payload() message: ExecuteTransactionMessage,
  ) {
    const tx = message.transactions[message.transactions.length - 1];
    const relatedInvestorId =
      message.order_type === "BUY" ? tx.seller_id : tx.buyer_id;

    await this.ordersService.executeTransaction({
      order_id: message.order_id,
      status: message.status,
      related_investor_id: relatedInvestorId,
      broker_transaction_id: tx.transaction_id,
      negotiated_shares: tx.shares,
      price: tx.price,
    });
  }
}
