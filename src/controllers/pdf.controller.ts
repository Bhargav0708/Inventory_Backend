// import { Request, Response } from "express";
// import PDFDocument from "pdfkit";
// import { Salesorders } from "../models/sales_order.model";
// import fs from "fs";
// import { Product } from "../models/product.model";
// interface SalesOrderData {
//   sales_order_id?: number;
//   customer_id?: number;
//   product_id?: number;
//   quantity?: number;
//   unit_price?: number;
//   total_amount?: number;
//   order_date?: string | Date;
//   order_status?: string;
//   expected_receive_date?: string | Date;
//   actual_received_date?: string | Date;
//   payment_id?: number;
//   notes?: string;
// }

// export const pdfController = {
//   async sales(req: Request, res: Response) {
//     try {
//       // const FetchSupplier = await
//       const supplierId = Number(req.params.supplierid);

//       const sales_orders = await Salesorders.findAll({
//         include: [
//           {
//             model: Product,
//             attributes: ["supplierid"],
//             where: supplierId ? { supplierid: supplierId } : undefined,
//           },
//         ],
//         attributes: [
//           "sales_order_id",
//           "customer_id",
//           "product_id",
//           "quantity",
//           "unit_price",
//           "total_amount",
//           "order_date",
//           "order_status",
//           "expected_receive_date",
//           "actual_received_date",
//           "notes",
//         ],
//         order: ["sales_order_id"],
//       });

//       const doc = new PDFDocument({
//         margin: 20,
//         size: "A4",
//         layout: "landscape",
//       });

//       doc.pipe(fs.createWriteStream("sales_report.pdf"));
//       doc.pipe(res);

//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader(
//         "Content-Disposition",
//         'attachment; filename="sales_report.pdf"'
//       );
//       doc.fontSize(20).text("Sales Report", { align: "center" });
//       doc.moveDown(2);

//       // Table configuration
//       const tableTop = 100;
//       const tableLeft = 20;
//       const rowHeight = 18;

//       const colWidths = [45, 56, 50, 40, 55, 60, 70, 60, 75, 75, 55, 115];

//       const headers = [
//         "Order ID",
//         "Customer ID",
//         "Product ID",
//         "Quantity",
//         "Unit Price",
//         "Total Amount",
//         "Order Date",
//         "Order Status",
//         "Expected Date",
//         "Actual Date",
//         "Notes",
//       ];

//       const drawTableHeader = (y: number) => {
//         let currentX = tableLeft;

//         doc
//           .rect(
//             tableLeft,
//             y,
//             colWidths.reduce((a, b) => a + b, 0),
//             rowHeight
//           )
//           .fillAndStroke("#4a90e2", "#000000");

//         doc.fillColor("#ffffff").fontSize(9);
//         headers.forEach((header, i) => {
//           doc.text(header, currentX + 1, y + 3, {
//             width: colWidths[i] - 2,
//             align: "center",
//             ellipsis: true,
//           });
//           currentX += colWidths[i];
//         });

//         return y + rowHeight;
//       };

//       const drawTableRow = (
//         order: SalesOrderData,
//         y: number,
//         isEven: boolean
//       ) => {
//         let currentX = tableLeft;

//         const fillColor = isEven ? "#f8f9fa" : "#ffffff";
//         doc
//           .rect(
//             tableLeft,
//             y,
//             colWidths.reduce((a, b) => a + b, 0),
//             rowHeight
//           )
//           .fillAndStroke(fillColor, "#cccccc");

//         // Row data
//         const rowData = [
//           order.sales_order_id?.toString() || "",
//           order.customer_id?.toString() || "",
//           order.product_id?.toString() || "",
//           order.quantity?.toString() || "",
//           order.unit_price ? `$${order.unit_price.toFixed(2)}` : "",
//           order.total_amount ? `$${order.total_amount.toFixed(2)}` : "",
//           order.order_date
//             ? new Date(order.order_date).toLocaleDateString()
//             : "",
//           order.order_status || "",
//           order.expected_receive_date
//             ? new Date(order.expected_receive_date).toLocaleDateString()
//             : "",
//           order.actual_received_date
//             ? new Date(order.actual_received_date).toLocaleDateString()
//             : "",
//           order.payment_id?.toString() || "",
//           order.notes || "",
//         ];

//         // Draw row text
//         doc.fillColor("#000000").fontSize(9);
//         rowData.forEach((data, i) => {
//           doc.text(data, currentX + 1, y + 3, {
//             width: colWidths[i] - 2,
//             align: "left",
//             ellipsis: true,
//           });
//           currentX += colWidths[i];
//         });

//         return y + rowHeight;
//       };

//       // Draw table
//       let currentY = drawTableHeader(tableTop);

//       // Draw data rows
//       sales_orders.forEach((order, index) => {
//         if (currentY > doc.page.height - 100) {
//           doc.addPage();
//           currentY = drawTableHeader(50);
//         }

//         currentY = drawTableRow(order, currentY, index % 2 === 0);
//       });

//       // Add summary section
//       doc.moveDown(2);
//       const summaryY = currentY + 30;

//       // Summary box
//       doc
//         .rect(tableLeft, summaryY, 200, 60)
//         .fillAndStroke("#e8f4f8", "#4a90e2");

//       doc.fillColor("#000000").fontSize(12);
//       doc.text("Summary", tableLeft + 10, summaryY + 10);
//       doc.fontSize(10);
//       doc.text(
//         `Total Records: ${sales_orders.length}`,
//         tableLeft + 10,
//         summaryY + 25
//       );

//       // Calculate totals
//       const totalAmount = sales_orders.reduce(
//         (sum, order) => sum + (order.total_amount || 0),
//         0
//       );
//       doc.text(
//         `Total Sales Amount: $${totalAmount.toFixed(2)}`,
//         tableLeft + 10,
//         summaryY + 40
//       );
//       doc
//         .fontSize(10)
//         .fillColor("#666666")
//         .text(
//           `Generated on: ${new Date().toLocaleString()}`,
//           tableLeft,
//           doc.page.height - 50
//         );

//       doc.end();
//     } catch (err) {
//       res.status(500).json({ error: "Failed to generate PDF" });
//     }
//   },
// };
import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import { Salesorders } from "../models/sales_order.model";
import fs from "fs";
import { Product } from "../models/product.model";

interface SalesOrderData {
  sales_order_id?: number;
  customer_id?: number;
  product_id?: number;
  quantity?: number;
  unit_price?: number;
  total_amount?: number;
  order_date?: string | Date;
  order_status?: string;
  expected_receive_date?: string | Date;
  actual_received_date?: string | Date;
  payment_id?: number;
  notes?: string;
  Product?: {
    supplierid: number;
  };
}

export const pdfController = {
  async sales(req: Request, res: Response): Promise<any> {
    try {
      const supplierId = Number(req.params.supplierid);

      const sales_orders = await Salesorders.findAll({
        include: [
          {
            model: Product,
            attributes: ["supplierid"],
            where: supplierId ? { supplierid: supplierId } : undefined,
            required: true,
          },
        ],
        raw: true,
        nest: true,
        attributes: [
          "sales_order_id",
          "customer_id",
          "product_id",
          "quantity",
          "unit_price",
          "total_amount",
          "order_date",
          "order_status",
          "expected_receive_date",
          "actual_received_date",
          "notes",
        ],
        order: [["sales_order_id", "ASC"]],
      });
      if (sales_orders.length === 0) {
        return res.status(200).json({ data: null, message: "no sales" });
      }

      const doc = new PDFDocument({
        margin: 20,
        size: "A4",
        layout: "landscape",
      });

      doc.pipe(fs.createWriteStream("sales_report.pdf"));
      doc.pipe(res);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="sales_report.pdf"'
      );

      doc.fontSize(20).text("Sales Report", { align: "center" });
      doc.moveDown(2);

      // Table setup
      const tableTop = 100;
      const tableLeft = 20;
      const rowHeight = 18;

      const headers = [
        "Order ID",
        "Customer ID",
        "Product ID",
        "Quantity",
        "Unit Price",
        "Total Amount",
        "Order Date",
        "Order Status",
        "Expected Date",
        "Actual Date",
        "Notes",
      ];

      const colWidths = [60, 60, 60, 50, 60, 70, 80, 70, 80, 80, 80];

      const drawTableHeader = (y: number) => {
        let currentX = tableLeft;

        doc
          .rect(
            tableLeft,
            y,
            colWidths.reduce((a, b) => a + b, 0),
            rowHeight
          )
          .fillAndStroke("#4a90e2", "#000");

        doc.fillColor("#fff").fontSize(9);
        headers.forEach((header, i) => {
          doc.text(header, currentX + 1, y + 3, {
            width: colWidths[i] - 2,
            align: "center",
            ellipsis: true,
          });
          currentX += colWidths[i];
        });

        return y + rowHeight;
      };

      const drawTableRow = (
        order: SalesOrderData,
        y: number,
        isEven: boolean
      ) => {
        let currentX = tableLeft;
        const fillColor = isEven ? "#f8f9fa" : "#ffffff";

        doc
          .rect(
            tableLeft,
            y,
            colWidths.reduce((a, b) => a + b, 0),
            rowHeight
          )
          .fillAndStroke(fillColor, "#ccc");

        const rowData = [
          order.sales_order_id?.toString() || "",
          order.customer_id?.toString() || "",
          order.product_id?.toString() || "",
          order.quantity?.toString() || "",
          order.unit_price ? `$${order.unit_price.toFixed(2)}` : "",
          order.total_amount ? `$${order.total_amount.toFixed(2)}` : "",
          order.order_date
            ? new Date(order.order_date).toLocaleDateString()
            : "",
          order.order_status || "",
          order.expected_receive_date
            ? new Date(order.expected_receive_date).toLocaleDateString()
            : "",
          order.actual_received_date
            ? new Date(order.actual_received_date).toLocaleDateString()
            : "",
          order.notes || "",
        ];

        doc.fillColor("#000").fontSize(9);
        rowData.forEach((data, i) => {
          doc.text(data, currentX + 1, y + 3, {
            width: colWidths[i] - 2,
            align: "left",
            ellipsis: true,
          });
          currentX += colWidths[i];
        });

        return y + rowHeight;
      };

      let currentY = drawTableHeader(tableTop);

      sales_orders.forEach((order, index) => {
        if (currentY > doc.page.height - 100) {
          doc.addPage();
          currentY = drawTableHeader(50);
        }

        currentY = drawTableRow(order, currentY, index % 2 === 0);
      });

      // Summary
      const summaryY = currentY + 30;
      doc
        .rect(tableLeft, summaryY, 200, 60)
        .fillAndStroke("#e8f4f8", "#4a90e2");

      doc.fillColor("#000").fontSize(12);
      doc.text("Summary", tableLeft + 10, summaryY + 10);
      doc.fontSize(10);
      doc.text(
        `Total Records: ${sales_orders.length}`,
        tableLeft + 10,
        summaryY + 25
      );

      const totalAmount = sales_orders.reduce(
        (sum, order) => sum + (order.total_amount || 0),
        0
      );
      doc.text(
        `Total Sales Amount: $${totalAmount.toFixed(2)}`,
        tableLeft + 10,
        summaryY + 40
      );

      doc
        .fontSize(10)
        .fillColor("#666")
        .text(
          `Generated on: ${new Date().toLocaleString()}`,
          tableLeft,
          doc.page.height - 50
        );

      doc.end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  },
};
