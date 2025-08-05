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
} from "sequelize-typescript";
import { Product } from "./product.model";

@Table({ tableName: "Categories", timestamps: true, paranoid: true })
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  cateogry_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  description!: string;

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
  // @HasMany(() => Product)
  // products!;:Product[]
  @HasMany(() => Product)
  product!: Product[];
}
