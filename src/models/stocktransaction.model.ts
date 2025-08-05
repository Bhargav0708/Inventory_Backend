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
} from "sequelize-typescript";
import { User } from "./user.model";
import { Category } from "./category.model";
import { Product } from "./product.model";
import { Warehouse } from "./warehouse.model";

@Table({ tableName: "Stocktransactions", timestamps: true, paranoid: true })
export class Stocktransactions extends Model<Stocktransactions> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  stock_transc_id!: number;

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
    type: DataType.ENUM("purchase", "sale", "return"),
    allowNull: false,
  })
  transaction_type!: string;
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
}
