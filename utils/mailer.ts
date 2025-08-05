// import {} from ""
import nodemailer, { SendMailOptions } from "nodemailer";
import fs from "fs";
import { error } from "console";
const transporter = nodemailer.createTransport({
  service: "smtp.gmail.com",
  host: "smtp.gmail.com",
  auth: {
    user: "yourmailservice453@gmail.com",
    pass: "zryubllloaajioaj ",
  },
});
export async function mailsend(
  toMail: string,
  subject: string,
  text: number,
  message: string
) {
  await transporter.sendMail({
    from: "yourmailservice453@gmail.com",
    to: toMail,
    subject: subject,
    html: `this is message is for ${message},and your OTP is ${text}`,
  });

  console.log(`Email sent to : ${toMail}`);
}

export async function SalesReport(
  toMail: string,
  subject: string,
  message: string,
  pdfPath?: string
) {
  try {
    //there is any type before it
    const mailOptions: SendMailOptions = {
      from: "yourmailservice453@gmail.com",
      to: toMail,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #2c3e50; margin: 0;">Sales Report</h2>
            <p style="color: #7f8c8d; margin: 10px 0;">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #495057; line-height: 1.6; margin: 0;">
              ${message.replace(/\n/g, "<br>")}
            </p>
          </div>
          
          <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #155724; margin: 0;">
              <strong>📊 Sales Report Attached</strong><br>
              Please find the detailed sales report attached as a PDF file.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              This is an automated email. Please do not reply to this message.
            </p>
          </div>
        </div>
      `,
    };

    if (pdfPath && fs.existsSync(pdfPath)) {
      mailOptions.attachments = [
        {
          filename: `sales_report_${
            new Date().toISOString().split("T")[0]
          }.pdf`,
          path: pdfPath,
          contentType: "application/pdf",
        },
      ];
    }

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${toMail}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
export async function SendAlert(
  toMail: string,
  subject: string,
  message: string
) {
  try {
    console.log("in send email", toMail, subject, message);
    await transporter.sendMail({
      from: "yourmailservice453@gmail.com",
      to: toMail,
      subject: subject,
      html: `this is message is  important because  ${message},`,
    });

    console.log(`Alert Email sent to : ${toMail}`);
  } catch (err) {
    console.log("Error Sending Email ", err);
    throw err;
  }
}
