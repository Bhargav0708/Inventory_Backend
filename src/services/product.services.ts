import { Product } from "../models/product.model";
import { productRespositry } from "../repositeries/product.repositry";

type Products = {
  name: string;
  barcode: string;
  description: string;
  price: number;
  supplierid: number;
  categoryid: number;
};
export const productService = {
  async create(data: Products) {
    // const name_of_the_product = "Iphone";
    // const barcode = "012345678905";
    // const description  = "new version"
    try {
      const name = data.name;
      const barcode = data.barcode;
      const ddescription = data.description;
      const price = Number(data.price);
      const suppiler_id = Number(data.supplierid);
      const cateogry_id = Number(data.categoryid);
      const productData: object = {
        name: name,
        barcode: barcode,
        description: ddescription,
        price: price,
        supplierid: Number(suppiler_id),
        categoryid: Number(cateogry_id),
      };
      const datatobesent = await productRespositry.create(
        productData as Product
      );
      return datatobesent;
    } catch (error) {
      throw error;
    }
  },
  async getAll() {
    const allusers = await productRespositry.getAll();
    return allusers;
  },
  async update(data: Product, path: string | undefined, id: number) {
    // if (path) {
    // }
    const userdata: object = {
      name: data?.name,
      barcode: data?.barcode,
      description: data?.description,
      price: data?.price,
      supplierid: data?.supplierid,
      categoryid: data?.categoryid,
      image_url: path,
    };
    const updateeduser = await productRespositry.update(
      userdata as Product,
      id
    );
    return updateeduser;
  },
  async delete(id: number) {
    const deleteeduser = await productRespositry.delete(id);
    return deleteeduser;
  },
  async fetchSupplierInfoBypid(id: number) {
    const fetchsupplier = await productRespositry.fetchAllSupplierInfoBypid(id);
    return fetchsupplier;
  },
  async SearchByNameSearch(data: any) {
    const Search = await productRespositry.searchByNameAndPrice(data);
    return Search;
  },
  // async fetchAllProducts(id: number) {

  // },
};
