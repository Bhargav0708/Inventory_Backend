import cron from "node-cron";
import { mailsend, SalesReport } from "./mailer";

export function sendSalesrecord() {
  try {
    cron.schedule("* 7 * * *", async () => {
      //   sendSalesrecord()
      SalesReport(
        "bhargav.harvani@esparkbizmail.com",
        "Your monthly sales report",
        "hello Your Monthly Report ",
        "/home/bhargav/Desktop/Internship_bhargav/Inventory_Management/sales_report.pdf"
      );
    });
  } catch (err) {
    throw err;
  }
}
