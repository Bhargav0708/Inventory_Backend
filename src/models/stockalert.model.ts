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
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Category } from "./category.model";
import { Product } from "./product.model";
import { Warehouse } from "./warehouse.model";

@Table({ tableName: "Stockalerts", timestamps: true, paranoid: true })
export class Stockalerts extends Model<Stockalerts> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  stock_alert_id!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id!: number;
  @ForeignKey(() => Warehouse)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  warehouse_id!: number;

  //   @Column({
  //     type: DataType.INTEGER,
  //     allowNull: false,
  //   })
  //   quantity!: number;

  //   @Column({
  //     type: DataType.ENUM("purchase", "sale", "return"),
  //     allowNull: false,
  //   })
  //   transaction_type!: string;
  @Column({
    type: DataType.ENUM("low_stock", "out_of_stock", "overstock"),
    allowNull: false,
  })
  alert_type!: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  current_quantity!: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  threshold_quantity!: number;
  //   @ForeignKey(() => User)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_resolved!: boolean;

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
  @BelongsTo(() => Product)
  product!: Product;
  @BelongsTo(() => Warehouse)
  warehouse!: Warehouse;
  //   @HasMany(() => Product)
  //   products!;:Product[]
}
