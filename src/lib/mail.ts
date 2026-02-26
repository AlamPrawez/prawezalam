// import nodemailer from "nodemailer";

// interface MailOptions {
//   to: string;           // recipient email
//   subject: string;      // email subject
//   text?: string;        // plain text message
//   html?: string;        // html message
// }

// /**
//  * Send email using SMTP (via nodemailer)
//  */
// export const sendMail = async ({ to, subject, text, html }: MailOptions) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT),
//       secure: false, // true if using 465
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"Your App" <no-reply@yourapp.com>`,
//       to,
//       subject,
//       text,
//       html,
//     });

//     console.log("Email sent:", info.messageId);
//     return { success: true, messageId: info.messageId };
//   } catch (err) {
//     console.error("Failed to send email:", err);
//     return { success: false, error: err };
//   }
// };
