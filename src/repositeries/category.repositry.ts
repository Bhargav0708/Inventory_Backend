import { customError } from "../helpers/customError";
import { Category } from "../models/category.model";

export const cateogryRespositry = {
  async create(data: Category) {
    return await Category.create(data);
  },
  async getAll() {
    return await Category.findAll();
  },
  async update(data: Category, id: number) {
    try {
      const productid = id;
      const updateeduser = await Category.update(data, {
        where: { cateogry_id: productid },
      });
      return updateeduser;
    } catch (error) {
      throw error;
    }
  },
  async delete(id: number) {
    const FoundCaterogry = await Category.findOne({
      where: { cateogry_id: id },
    });
    if (FoundCaterogry == null) {
      throw new customError(
        "CATEGORY_NOT_FOUND",
        "Category Not Found To Delete"
      );
    }
    const deleteeduser = await Category.destroy({ where: { cateogry_id: id } });
    return deleteeduser;
    // return deleteeduser;
  },
};
