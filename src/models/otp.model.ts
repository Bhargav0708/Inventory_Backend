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
  DeletedAt,
} from "sequelize-typescript";

@Table({ tableName: "Otps", timestamps: true })
export class OTP extends Model<OTP> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  otp!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    // unique: true,
  })
  email!: string;

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
}
