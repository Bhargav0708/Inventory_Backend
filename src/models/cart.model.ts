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
  DeletedAt,
} from "sequelize-typescript";
import { Product } from "./product.model";
import { User } from "./user.model";

@Table({ tableName: "Cart", timestamps: true })
export class Cart extends Model<Cart> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  cartid!: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userid!: number;
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productid!: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;
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

  @DeletedAt
  @Column({
    field: "deletedAt",
  })
  deletedAt?: Date;
  // @HasMany(() => Product)
  // products!;:Product[]
  //   @HasMany(() => Product)
  //   product!: Product[];
}
