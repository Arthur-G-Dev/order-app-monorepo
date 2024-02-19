import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";
import { OrderStatus, Size } from "../enums";

@Entity()
export default class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type?: string;

  @Column("enum", {enum: Size, default: Size.MEDIUM})
  size: Size;

  @Column('simple-array')
  toppings?: string[];

  @Index('order_status_index')
  @Column("enum", {enum: OrderStatus, default: OrderStatus.PENDING})
  status: OrderStatus
}

export type OrderType = InstanceType<typeof Order>;
