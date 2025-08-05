import { paginationData } from "../controllers/purchase_order.controller";
import { customError } from "../helpers/customError";
import { Product } from "../models/product.model";
// const { Op } = require("sequelize");
import { Op } from "sequelize";

export const productRespositry = {
  async create(data: Product) {
    return await Product.create(data);
  },
  async getAll() {
    // return await Product.findAll();
    return await Product.findAll({
      // where: {
      //   price: {
      //     [Op.between]: [50000, 100000],
      //   },
      // },
      limit: 50,
      offset: 0,
      order: [["price", "ASC"]],
    });
  },

  async update(data: Product, id: number) {
    try {
      const productid = id;

      const updateeduser = await Product.update(data, {
        where: { product_id: productid },
      });
      return updateeduser;
    } catch (error) {
      throw error;
    }

    // await Product.update();
  },
  async delete(dataid: number) {
    const found = await Product.findOne({ where: { product_id: dataid } });
    if (found == null) {
      throw new customError("PRODUCT_NOT_FOUND", "Product Not Found To Delete");
    }
    const deletedproduct = await Product.destroy({
      where: { product_id: dataid },
    });
    return deletedproduct;
  },
  async fetchAllSupplierInfoBypid(id: number) {
    const findAllProductbySupplierID = await Product.findAll({
      where: {
        product_id: id,
      },
    });
    return findAllProductbySupplierID;
  },
  // async searchByNameAndPrice(data: any) {
  //   const name = data.nameSearch;
  //   const price = data.priceSearch;
  //   const where: any = {};
  //   if (name) {
  //     where.name = { [Op.like]: `%${name}%` };
  //   } else {
  //     where.price = Number(price);
  //   }
  //   const SearchedData = await Product.findAll({ where });
  //   return SearchedData;
  // },
  async searchByNameAndPrice(data: paginationData) {
    try {
      const searchedTerm = `%${data.search}%`;
      console.log("the searched term", searchedTerm);
      const parsedNumber = Number(data.search);
      const isValidNumber = !isNaN(parsedNumber);

      console.log("");
      const orConditions: any[] = [
        {
          name: {
            [Op.iLike]: searchedTerm, // case-insensitive
          },
        },
      ];

      if (isValidNumber) {
        orConditions.push({
          price: {
            [Op.eq]: parsedNumber,
          },
        });
      }
      const SearchedData = await Product.findAll({
        where: {
          [Op.or]: orConditions,
        },
      });

      console.log("this is response of the search in the repo", SearchedData);
      return SearchedData;
    } catch (error) {
      console.log("this is ", error);
    }
  },
  // async fetchallproductbyid(id: number) {},
  //   async update(data: Product) {},
};
