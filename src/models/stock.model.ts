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

@Table({ tableName: "Stocks", timestamps: true, paranoid: true })
export class Stocks extends Model<Stocks> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  stockid!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productid!: number;
  @ForeignKey(() => Warehouse)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    // unique: true,
  })
  warehouse_id!: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    // unique: true,
  })
  quantity!: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  minstock!: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxstock!: number;
  //   @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  recordstock!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  lastupdatedstock!: Date;

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
