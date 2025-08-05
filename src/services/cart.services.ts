import { cartRepositry } from "../repositeries/cart.repositry";

export const cartService = {
  async create(data: any) {
    const cart = await cartRepositry.create(data);
    return cart;
  },
  async getcartByUserid(id: number) {
    const getcartData = await cartRepositry.getCartbyuserid(id);
    return getcartData;
  },
  async RemoveByProductId(id: number) {
    const RemoveProductId = await cartRepositry.RemoveByProductID(id);
    return RemoveProductId;
  },
  async cartUpdateByQuantity(id: number, quanity: number, userid: number) {
    const DecrementQuantity = await cartRepositry.cartUpdateQuantity(
      id,
      quanity,
      userid
    );
    return DecrementQuantity;
  },
  async RemoveCartByUserId(id: number) {
    const RemoveCart = await cartRepositry.RemoveCartByUserID(id);
    return RemoveCart;
  },
  async AddProduct(data: any) {
    console.log("this is the data in the service incoming", data);
    const id = data.pid;
    const quantity = data.productQuantity;
    const userid = data.UserId;
    console.log("the quanity in the service", quantity, userid);
    const AddProductData = await cartRepositry.AddProduct(id, quantity, userid);
    return AddProductData;
  },
};
