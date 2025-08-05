import { paginationData } from "../controllers/purchase_order.controller";
import { customError } from "../helpers/customError";
import { Payments } from "../models/payment.model";
import { Product } from "../models/product.model";
import { Purchaseorders } from "../models/purchase_order.model";
import { Salesorders } from "../models/sales_order.model";
import { Stocks } from "../models/stock.model";
import { paymentRepositry } from "../repositeries/payment.repositry";
import { productRespositry } from "../repositeries/product.repositry";
import { Purchase_orderRepositry } from "../repositeries/purchase_order.repositry";
import { Sales_orderRepositry } from "../repositeries/sales_orders.repositry";
import { stockRepositry } from "../repositeries/stock.repositry";
import purchase_order from "../routes/purchase_order.routes";
import { stockService } from "./stock.services";

// id=2
export const Purchase_orderServices = {
  async create(data: Purchaseorders, productid: number) {
    // const name_of_the_product = "Iphone";
    // const barcode = "012345678905";
    // const description  = "new version"
    try {
      const user_id = data.user_id;
      const product_id = productid;
      const quantity = data.quantity;
      const unit_price = data.unit_price;
      const total_amount = data.total_amount;
      const expected_receive_date = data.expected_receive_date;
      const actual_received_date = data.actual_received_date;
      // const payment_id = data.payment_id;

      const notes = data.notes;

      // in backend i have to make entry to paymeet table so the table so i have to make
      // const payment_time = data.payment_time;

      const is_available = await stockRepositry.getProductData(product_id);
      if ((is_available?.quantity as number) < quantity) {
        // throw new Error("Product quanntity is not much give lesser");
        // return false;
        // throw new customError("ytyt");
        throw new customError(
          "Quantity_Exceed",
          "Not sufficient quantity in our stocks"
        );
      }
      const purchase_product_data: object = {
        user_id: user_id,
        product_id: product_id,
        quantity: quantity,
        unit_price: unit_price,
        total_amount: total_amount,
        expected_receive_date: expected_receive_date,
        actual_received_date: actual_received_date,
        // payment_id: payment_id,
        notes: notes,
      };

      const datatobesent = await Purchase_orderRepositry.create(
        purchase_product_data as Purchaseorders
      );

      const stock_quantity: number =
        (is_available?.quantity as number) - quantity;
      const stockdata: object = {
        quantity: stock_quantity,
      };
      const quanntity_upate = await stockRepositry.update(
        stockdata as Stocks,
        product_id
      );
      if (quanntity_upate?.length == 1) {
        const alert = await stockService.Alert(product_id);
      }

      // for sales order
      const purchase_order_id = datatobesent.purchase_order_id;
      const sales_order_data: object = {
        customer_id: user_id,
        product_id: product_id,
        purchase_order_id: purchase_order_id,
        quantity: quantity,
        unit_price: unit_price,
        total_amount: total_amount,
        expected_receive_date: expected_receive_date,
        actual_received_date: actual_received_date,
        notes: notes,
      };
      const salesorder_data = await Sales_orderRepositry.create(
        sales_order_data as Salesorders
      );

      // for make data entry on table payments
      const payment_status = ["pending", "paid", "failed"];
      const makerandom = Math.floor(Math.random() * 3);
      const payment_method = ["cash", "online", "credit_card", "bank_transfer"];
      const random = Math.floor(Math.random() * 4);
      let payment_method_insertion: string = payment_method[random];
      let payment_status_insertion: string = payment_status[makerandom];
      const order_id = datatobesent.purchase_order_id;
      const payment_object: object = {
        payment_personid: user_id,
        order_id: order_id,
        amount: total_amount,
        payment_method: payment_method_insertion,
        payment_status: payment_status_insertion,
      };
      const payment_data = await paymentRepositry.create(
        payment_object as Payments
      );
      return datatobesent;
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }
    }

    // order_date,order_status
  },
  async getAll(data: paginationData) {
    const allusers = await Purchase_orderRepositry.getAll(data);
    return allusers;
  },
  async update(data: Purchaseorders, purchase_order_id: number) {
    try {
      const exists = await Purchase_orderServices.CheckExists(
        purchase_order_id
      );
      //purchase order
      const purchase_product_data: object = {
        user_id: data.user_id,
        product_id: data.product_id,
        quantity: data.quantity,
        unit_price: data.unit_price,
        total_amount: data.total_amount,
        expected_receive_date: data.expected_receive_date,
        actual_received_date: data.actual_received_date,
        // payment_id: payment_id,
        notes: data.notes,
      };
      const updateeduser = await Purchase_orderRepositry.update(
        purchase_product_data as Purchaseorders,
        purchase_order_id
      );
      // for sales
      const sales_order_data: object = {
        customer_id: data.user_id,
        product_id: data.product_id,
        purchase_order_id: purchase_order_id,
        quantity: data.quantity,
        unit_price: data.unit_price,
        total_amount: data.total_amount,
        expected_receive_date: data.expected_receive_date,
        actual_received_date: data.actual_received_date,
        notes: data.notes,
      };
      const updateSalesOrder = await Sales_orderRepositry.update(
        sales_order_data as Salesorders,
        purchase_order_id
      );
      if (updateSalesOrder?.[0] == 1) {
      }
      //for payments

      const payment_status = ["pending", "paid", "failed"];
      const makerandom = Math.floor(Math.random() * 3);
      const payment_method = ["cash", "online", "credit_card", "bank_transfer"];
      const random = Math.floor(Math.random() * 4);
      let payment_method_insertion: string = payment_method[random];
      let payment_status_insertion: string = payment_status[makerandom];
      // const order_id = datatobesent.purchase_order_id;

      const payment_object: object = {
        payment_personid: data.user_id,
        order_id: purchase_order_id,
        amount: data.total_amount,
        payment_method: payment_method_insertion,
        payment_status: payment_status_insertion,
      };
      const payment_updated = await paymentRepositry.update(
        payment_object as Payments,
        purchase_order_id
      );
      if (payment_updated?.[0] == 1) {
      }

      return updateeduser;
    } catch (error) {
      throw error;
    }
  },
  async delete(purchase_order_id: number) {
    const deleteeduser = await Purchase_orderRepositry.delete(
      purchase_order_id
    );
    if (deleteeduser == 0) {
      return 0;
    }
    const deletedfromsales = await Sales_orderRepositry.delete(
      purchase_order_id
    );
    if (deletedfromsales == 0) {
      return 0;
    }
    const deltedfromPayment = await paymentRepositry.delete(purchase_order_id);
    if (deltedfromPayment == 0) {
      return 0;
    }

    return deleteeduser;
  },
  async purchaseorderbyuserid(id: number) {
    const purchaseorderbyuserid =
      await Purchase_orderRepositry.PurchaseOrderByuserid(id);
    return purchaseorderbyuserid;
  },
  async CheckExists(id: number) {
    const check = await Purchase_orderRepositry.CheckExistance(id);
    return check;
  },
};
