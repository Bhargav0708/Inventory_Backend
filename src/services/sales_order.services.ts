import { Product } from "../models/product.model";

import { Salesorders } from "../models/sales_order.model";
import { productRespositry } from "../repositeries/product.repositry";
import { Purchase_orderRepositry } from "../repositeries/purchase_order.repositry";
import { Sales_orderRepositry } from "../repositeries/sales_orders.repositry";
import sales_order from "../routes/sales_orders.routes";

// id=2
export const Sales_orderServices = {
  async create(data: Salesorders, productid: number) {
    // const name_of_the_product = "Iphone";
    // const barcode = "012345678905";
    // const description  = "new version"

    try {
      const customer_id = data.customer_id;
      const product_id = productid;
      const purchase_order_id = data.purchase_order_id;
      const quantity = data.quantity;
      const unit_price = data.unit_price;
      const total_amount = data.total_amount;
      //   const order_date = data.order_date;
      //   const order_status = data.order_status;
      const expected_receive_date = data.expected_receive_date;
      const actual_received_date = data.actual_received_date;
      // const payment_id = data.payment_id;
      const notes = data.notes;
      // order_date,order_status
      const Sales_order_data: object = {
        customer_id: customer_id,
        product_id: product_id,
        purchase_order_id: purchase_order_id,
        quantity: quantity,
        unit_price: unit_price,
        total_amount: total_amount,
        // order_date: order_date,
        // order_status: order_status,
        expected_receive_date: expected_receive_date,
        actual_received_date: actual_received_date,
        // payment_id: payment_id,
        notes: notes,
      };

      //this is changed due to pagination
      // const Purchased_data = await Purchase_orderRepositry.getAll();
      // Purchased_data.forEach(async (data, index) => {
      //   index = 1;
      //   if (index > 8) {
      //     index = 1;
      //   }
      //   const objofsales = {
      //     customer_id: data.user_id,
      //     product_id: data.product_id,
      //     purchase_order_id: data.purchase_order_id,
      //     quantity: data.quantity,
      //     unit_price: data.unit_price,
      //     total_amount: data.total_amount,
      //     // order_date: order_date,
      //     // order_status: order_status,
      //     expected_receive_date: data.expected_receive_date,
      //     actual_received_date: data.actual_received_date,
      //     payment_id: index,
      //     notes: data.notes,
      //   };
      //   // const datatobesent = await Sales_orderRepositry.create(
      //   //   objofsales as Salesorders
      //   // );

      //
      //   // return datatobesent;
      // });

      // const datatobesent = await Sales_orderRepositry.create(
      //   Sales_order_data as Salesorders
      // );
      // return datatobesent;
    } catch (err) {
      console.log(err);
    }
  },
  async getAll() {
    const allSales = await Sales_orderRepositry.getAll();
    return allSales;
  },
  async update(data: Product, id: number) {},
  async delete(id: number) {
    const deleteeduser = await productRespositry.delete(id);
    return deleteeduser;
  },
  async CustomerDataOfSales() {
    const AllCustomerData =
      await Sales_orderRepositry.CustomerDetailsOfSalesOrder();
    return AllCustomerData;
  },
  // async SalesAllDataBySupplierID(id: number) {
  //   const SalesAllDataBySupplierID =
  //     await Sales_orderRepositry.SalesOrderBySupplierID(id);
  // },
};
