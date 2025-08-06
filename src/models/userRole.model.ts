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
import { Roles } from "./role.model";

@Table({ tableName: "userRole", timestamps: true })
export class userRole extends Model<userRole> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userid!: number;
  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleid!: number;
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
  //   @HasMany(() => Product)
  //   products!;:Product[]
}
