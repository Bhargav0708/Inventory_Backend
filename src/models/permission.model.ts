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
  BelongsToMany,
} from "sequelize-typescript";
import { Roles } from "./role.model";
import { RolePermisson } from "./rolepermission.model";

@Table({ tableName: "Permission", timestamps: true, paranoid: true })
export class Permission extends Model<Permission> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  permissionid!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  permission_name!: string;
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
  @BelongsToMany(() => Roles, () => RolePermisson)
  Roles!: Roles[];
  //   @HasMany(() => Product)
  //   products!;:Product[]
}
