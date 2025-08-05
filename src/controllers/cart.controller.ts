import { Request, Response } from "express";
import { cartService } from "../services/cart.services";
import { customError } from "../helpers/customError";
export const cartController = {
  async create(req: Request, res: Response) {
    // const createCart =
    const cartBody = req.body;
    console.log("the cartBody", cartBody);
    // const CartData = {
    //   userid: cartBody.id,
    //   productid: cartBody.product_id,
    //   quantity: cartBody.quantity,
    //   price: cartBody.price,
    // };
    const createCart = await cartService.create(cartBody);
    // console.log("the cart resposne in the contoller", createCart);
    if (createCart) {
      res.status(200).json({
        data: createCart,
        msg: "Added To the cart Succeesfully",
      });
    } else {
      res.status(400).json({
        data: null,
        msg: "the Data is not Added to the cart ",
      });
    }
  },
  async cartByuserid(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }
      const cartData = await cartService.getcartByUserid(id);
      if (cartData) {
        res.status(200).json({
          data: cartData,
          msg: "CartData Get Successfully",
        });
      } else {
        res.status(400).json({
          data: null,
          msg: "No data Found",
        });
      }
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey == "ID_NAN") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      } else {
        res.status(400).json({
          msg: "Internal Server error",
        });
      }
    }
  },
  async RemoveByProductId(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      throw new customError("ID_NAN", "Please Enter ID IN Number ");
    }
    console.log("this is id of removal product ", id);
    const RemoveProductID = await cartService.RemoveByProductId(id);
    console.log("the result in the Controller", RemoveProductID);
    if (RemoveProductID == 1) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  },
  async cartItemRemovebyquantity(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }
      const data = req.body;
      console.log("the data in remove ", data);
      const pid = req.body.pid;
      const quanity = req.body.pquantity;
      const userid = req.body.userid;
      const removeQuanity = await cartService.cartUpdateByQuantity(
        pid,
        quanity,
        userid
      );
      console.log("the remove Quantity", removeQuanity);
      if (removeQuanity) {
        res.status(200).json({
          data: removeQuanity,
        });
      } else {
        res.status(400).json({
          data: null,
        });
      }
      //   const RemoveQuanity = cartService.cartUpdateByQuantity();
    } catch (error) {
      console.log(error);
    }
  },
  async RemoveCartByUserId(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      throw new customError("ID_NAN", "Please Enter ID IN Number ");
    }
    console.log("the user id", id);
    const ClearCart = await cartService.RemoveCartByUserId(id);
    console.log("the clear cart in the controller", ClearCart);
    if (ClearCart! > 0) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(400).json({
        success: false,
      });
    }
  },
  async AddProductQuantity(req: Request, res: Response) {
    const data = req.body;
    console.log("the Add Product Data", data);
    const AddQuantity = await cartService.AddProduct(data);
    console.log("the Add Quantity", AddQuantity);
    if (AddQuantity) {
      res.status(200).json({
        data: AddQuantity,
      });
    } else {
      res.status(400).json({
        data: null,
        msg: "You cannot Remove Press Remove For Entire Removal",
      });
    }
  },
};
