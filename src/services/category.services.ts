import { Category } from "../models/category.model";
import { cateogryRespositry } from "../repositeries/category.repositry";

export const categoryService = {
  async create(data: Category) {
    const category_name = data.name;
    const cdescription = data.description;
    const categoryData: object = {
      name: category_name,
      description: cdescription,
    };
    const datatobesent = await cateogryRespositry.create(
      categoryData as Category
    );
    return datatobesent;
  },
  async getAll() {
    const all_cateogires = await cateogryRespositry.getAll();
    return all_cateogires;
  },
  async update(data: Category, id: number) {
    const updateeduser = await cateogryRespositry.update(data, id);
    return updateeduser!;
  },
  async delete(id: number) {
    const deleteeduser = await cateogryRespositry.delete(id);
    return deleteeduser;
  },
};
