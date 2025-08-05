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
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Category } from "./category.model";
import { Product } from "./product.model";
import { Warehouse } from "./warehouse.model";
import { Payments } from "./payment.model";
import { Purchaseorders } from "./purchase_order.model";

@Table({ tableName: "Salesorders", timestamps: true, paranoid: true })
export class Salesorders extends Model<Salesorders> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  sales_order_id!: number;
  // @ForeignKey(() => Purchaseorders)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // order_id!: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer_id!: number;
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id!: number;
  @ForeignKey(() => Purchaseorders)
  @Column(DataType.INTEGER)
  purchase_order_id?: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  unit_price!: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_amount!: number;
  // @ForeignKey(() => Purchaseorders)
  @Default(Date.now())
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  order_date!: Date;
  // @ForeignKey(() => Purchaseorders)
  @Default("pending")
  @Column({
    type: DataType.ENUM("pending", "confirmed", "received", "cancelled"),
    allowNull: false,
  })
  order_status!: string;
  // @ForeignKey(() => Purchaseorders)
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expected_receive_date!: Date;
  // @ForeignKey(() => Purchaseorders)
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  actual_received_date!: Date;
  // @ForeignKey(() => Payments)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // payment_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  notes!: string;
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
  @BelongsTo(() => User)
  salesUser!: User;
  @BelongsTo(() => Product)
  salesproducts!: Product;
}
