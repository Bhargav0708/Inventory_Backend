import { Cart } from "../models/cart.model";

export const cartRepositry = {
  async create(data: any) {
    console.log("the data in the repo", data);
    const id = data.userid;
    const productid = data.productid;
    const Exisist = await Cart.findOne({
      where: {
        userid: id,
        productid,
      },
    });
    if (Exisist) {
      return await Exisist.increment("quantity", { by: 1 });
    } else {
      const createCart = await Cart.create(data);
      console.log("the createCart in the repo", createCart);
      return createCart;
    }
  },
  async getCartbyuserid(id: number) {
    const CartData = await Cart.findAll({
      where: {
        userid: id,
      },
    });
    return CartData;
  },
  async RemoveByProductID(id: number) {
    const foundExsistence = await Cart.findAll({
      where: {
        productid: id,
      },
    });
    if (foundExsistence) {
      const deleteProduct = await Cart.destroy({
        where: {
          productid: id,
        },
      });
      console.log("the delete", deleteProduct);
      return deleteProduct;
    } else {
      return;
    }
  },
  async cartUpdateQuantity(id: number, quanity: number, userid: number) {
    if (quanity > 0) {
      const removeQuantity = await Cart.decrement("quantity", {
        by: 1,
        where: {
          productid: id,
          userid,
        },
      });
      const [updatedCartArray] = removeQuantity;
      const [updatedCart] = updatedCartArray;
      console.log("the Add in the Quantity in repo...", removeQuantity);
      console.log("the updated Cart", updatedCart);
      // console.log("");
      return updatedCart;
    } else {
      return null;
    }
  },
  async RemoveCartByUserID(id: number) {
    const ClearCart = await Cart.destroy({
      where: {
        userid: id,
      },
    });
    console.log("the clear cart", ClearCart);
    if (ClearCart > 0) {
      return ClearCart;
    } else {
      return;
    }
  },
  async AddProduct(id: number, quantity: number, uid: number) {
    if (quantity > 0) {
      const AddQuantity = await Cart.increment("quantity", {
        by: 1,
        where: {
          productid: id,
          userid: uid,
        },
      });
      const [updatedCartArray] = AddQuantity;
      const [updatedCart] = updatedCartArray;
      console.log("the Add in the Quantity in repo...", AddQuantity);
      // console.log("the updated Cart", updatedCart.toJSON);
      // console.log("");
      return updatedCart;
    } else {
      return null;
    }
  },
};
