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
import { strict } from "assert";

@Table({ tableName: "Purchaseorders", timestamps: true, paranoid: true })
export class Purchaseorders extends Model<Purchaseorders> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  purchase_order_id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id!: number;

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
  @Default(Date.now())
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  order_date!: Date;
  @Default("pending")
  @Column({
    type: DataType.ENUM("pending", "confirmed", "received", "cancelled"),
    allowNull: false,
  })
  order_status!: string;
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expected_receive_date!: Date;
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  actual_received_date!: Date;
  @ForeignKey(() => Payments)
  payment_id!: Date;
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
  user!: User;
  @BelongsTo(() => Product)
  product!: Product;
}
