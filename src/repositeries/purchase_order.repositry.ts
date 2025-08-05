import { Cast } from "sequelize/types/utils";
import { paginationData } from "../controllers/purchase_order.controller";
import { customError } from "../helpers/customError";
import { Purchaseorders } from "../models/purchase_order.model";
import { Stocks } from "../models/stock.model";
import { col, Op, Sequelize, WhereOptions } from "sequelize";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
import { Addresses } from "../models/address.model";

export const Purchase_orderRepositry = {
  async create(data: Purchaseorders) {
    // const purchasedata_productid = data.product_id;
    // const stockquantity = Stocks.sequelize?.query(
    //   `select quantity from Stocks where product_id =${purchasedata_productid}`
    // );
    // const quantity_to_be_purchased = data.quantity;

    return await Purchaseorders.create(data);
  },
  async getAll(data: paginationData) {
    try {
      const sortBy = data.sortBy;

      const searchedTerm = `%${data.search}%`;
      return await Purchaseorders.findAll({
        where: {
          [Op.or]: [
            {
              notes: {
                [Op.like]: searchedTerm,
              },
            },

            Sequelize.where(
              Sequelize.cast(Sequelize.col("order_status"), "TEXT"),
              {
                [Op.like]: searchedTerm,
              }
            ),
          ],
        },

        include: [
          {
            model: Product,
            as: "product",

            attributes: ["name", "barcode", "description", "price"],
            include: [
              {
                model: User,
                as: "user",
                attributes: ["id", "name", "email", "addressid"],
                include: [
                  {
                    model: Addresses,
                    as: "addresses",
                    required: false,
                  },
                ],
              },
              {
                model: Category,
                as: "category",
                attributes: ["name", "description"],
              },
            ],
          },
        ],
        limit: data.limit,
        offset: data.offset,
        order: [[sortBy, data.sortType]],
      });
    } catch (error) {
      throw error;
    }
  },
  async update(data: Purchaseorders, purchase_order_id: number) {
    // const productid = id;
    const existt = await Purchaseorders.findAll({
      where: {
        deletedAt: {
          [Op.not]: null,
        },
      },
    });
    console.log("the exist", existt);
    // if (!existt) {
    //   console.log("the exists null");
    // }
    if (existt.length === 0) {
      throw new customError(
        "PURCHASE_ORDER_NOT_FOUND_TO_DELETE",
        "the purchase you want to update is deleted there is not option to update"
      );
      // console.log("No purchase orders with deletedAt NOT NULL");
    }
    const updateeduser = await Purchaseorders.update(data, {
      where: { purchase_order_id },
    });
    return updateeduser;
  },
  async delete(id: number) {
    try {
      const found_deleted_purchase = await Purchaseorders.findOne({
        where: { purchase_order_id: id },
      });
      //   "purchase Order_is not found in the repositry",
      //   found_deleted_purchase
      // );
      if (!found_deleted_purchase) {
        throw new customError(
          "PURCHASE_ORDER_NOT_FOUND",
          "User Not Found to delete "
        );
      } else {
        const deletetheaddress = Purchaseorders.destroy({
          where: { purchase_order_id: id },
        });
        return deletetheaddress;
      }
    } catch (error) {
      if (error instanceof customError) {
      } else {
        throw error;
      }
    }
  },
  async PurchaseOrderByuserid(id: number) {
    const finduser = await Purchaseorders.findAll({
      where: {
        user_id: id,
      },
    });
    return finduser;
  },
  async CheckExistance(id: number) {
    const existance = await Purchaseorders.findAll({
      where: { deletedAt: null },
    });
    return existance;
  },

  // async checkExistance = await Purchaseorders.findAll()
};
