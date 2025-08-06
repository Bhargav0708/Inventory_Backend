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
  HasOne,
  DeletedAt,
} from "sequelize-typescript";
import { Stocks } from "./stock.model";
import { Stockalerts } from "./stockalert.model";
import { Warehouseaddresses } from "./warehouseaddress.model";

@Table({ tableName: "Warehouses", timestamps: true })
export class Warehouse extends Model<Warehouse> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  warehouse_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  manager_name!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isactive!: boolean;

  @CreatedAt
  @Column({
    field: "createdAt",
  })
  createdAt?: Date;
  @UpdatedAt
  @Column({
    field: "updatedAt",
  })
  @DeletedAt
  @Column({
    field: "deletedAt",
  })
  deletedAt?: Date;
  updatedAt?: Date;
  @HasMany(() => Stocks)
  stocks!: Stocks[];
  @HasMany(() => Stockalerts)
  stockalerts!: Stockalerts[];
  @HasOne(() => Warehouseaddresses) // Or @HasMany if multiple
  warehouseAddress!: Warehouseaddresses;
  //   @HasMany(() => Product)
  //   products!;:Product[]
}
