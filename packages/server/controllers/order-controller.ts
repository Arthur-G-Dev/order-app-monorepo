import { Request, Response } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import { Controller, Get, Post, Put, } from '@overnightjs/core';
import { AppDataSource, Order, OrderType } from "@package/database/src";

@Controller('api/order')
export default class OrderController {
  private orderRepo = AppDataSource.getRepository(Order)
  @Get('list')
  private async getList(_:Request, res: Response) {
    try {
      const orders = await this.orderRepo.find()
      return res.status(OK).json(orders);
    } catch (err) {
      return res.status(BAD_REQUEST).json({message: err});
    }
  }

  @Post()
  private async create(req: Request, res: Response) {
    try {
      const data: OrderType = req.body
      const newOrder = this.orderRepo.create(data)
      const result = await this.orderRepo.save(newOrder)
      return res.status(OK).json({message: "Order created"});
    } catch (err) {
      return res.status(BAD_REQUEST).json({message: err});
    }
  }

  @Put()
  private async update(req: Request, res: Response) {
    const {id} = req.body
    try {
      const order = await this.orderRepo.findOne({where: {id}})
      if(!order) {
        return res.status(OK).json({message: "Can't update non existing order."});
      }
      order.status = order.status += 1
      await this.orderRepo.save(order)

      return res.status(OK).json({message: 'Status updated'});
    } catch (err) {
      return res.status(BAD_REQUEST).json({message: err});
    }
  }
}
