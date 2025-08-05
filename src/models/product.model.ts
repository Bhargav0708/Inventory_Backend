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
import { Purchaseorders } from "./purchase_order.model";
import { Stocks } from "./stock.model";
import { Stockalerts } from "./stockalert.model";
import { Salesorders } from "./sales_order.model";

@Table({ tableName: "Products", timestamps: true, paranoid: true })
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  product_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    // unique: true,
  })
  barcode!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    // unique: true,
  })
  description!: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    // unique: true,
  })
  price!: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    // unique: true,
  })
  supplierid!: number;
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    // unique: true,
  })
  categoryid!: number;

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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image_url!: string;
  //   @HasMany(() => Product)
  //   products!;:Product[]
  @BelongsTo(() => Category)
  category!: Category[];
  @BelongsTo(() => User)
  user!: User[];
  @HasMany(() => Purchaseorders)
  purchaseorders!: Purchaseorders[];
  @HasMany(() => Stocks)
  stocks!: Stocks[];
  @HasMany(() => Stockalerts)
  stockalerts!: Stockalerts[];
  @HasMany(() => Salesorders)
  sales!: Salesorders[];
}
