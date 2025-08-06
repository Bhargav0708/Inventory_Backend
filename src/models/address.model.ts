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
import { User } from "./user.model";

@Table({ tableName: "Addresses", timestamps: true })
export class Addresses extends Model<Addresses> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  addressid!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userid!: number;

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
  @BelongsTo(() => User)
  user!: User;
}
