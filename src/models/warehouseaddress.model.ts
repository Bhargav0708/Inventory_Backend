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
  DeletedAt,
} from "sequelize-typescript";
import { Warehouse } from "./warehouse.model";

@Table({ tableName: "Warehouseaddresses", timestamps: true })
export class Warehouseaddresses extends Model<Warehouseaddresses> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  warehouseadressid!: number;

  @ForeignKey(() => Warehouse)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  warehouseid!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country!: string;

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
  @BelongsTo(() => Warehouse)
  warehouse!: Warehouse;
  //   @HasMany(() => Product)
  //   products!;:Product[]
}
