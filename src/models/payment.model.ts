import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  BeforeValidate,
  HasMany,
  ForeignKey,
  Default,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Category } from "./category.model";
import { Product } from "./product.model";
import { Warehouse } from "./warehouse.model";
import { Purchaseorders } from "./purchase_order.model";
import { Salesorders } from "./sales_order.model";
export enum payment_method {
  CASH = "cash",
  ONLINE = "online",
  CREDIT_CARD = "credit_card",
  BANK_TRANSFER = "bank_transfer",
}
export enum payment_status {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}
@Table({ tableName: "Payments", timestamps: true, paranoid: true })
export class Payments extends Model<Payments> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  paymentid!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  payment_personid!: number;

  @ForeignKey(() => Purchaseorders)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id!: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    // unique: true,
  })
  amount!: number;
  @Column({
    type: DataType.ENUM("cash", "online", "credit_card", "bank_transfer"),
    allowNull: false,
  })
  payment_method!: payment_method;

  @Column({
    type: DataType.ENUM("pending", "paid", "failed"),
    allowNull: false,
  })
  payment_status!: payment_status;
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  payment_time!: Date;
  @CreatedAt
  @Column({
    field: "createdAt",
  })
  createdAt?: Date;
  @UpdatedAt
  @Column({
    field: "updatedAt",
  })
  updatedAt?: Date;
  //   @HasMany(() => Product)
  //   products!;:Product[]
}
