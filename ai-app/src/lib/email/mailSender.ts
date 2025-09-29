import nodemailer from "nodemailer";

interface MailProps {
  email: string;
  title: string;
  body: string;
}

const mailSender = async ({ email, title, body }: MailProps) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "Ai Assistant Pvt. Ltd.",
      to: email,
      subject: title,
      text: body,
    });

    return info;
  } catch (error) {
    console.log("Error occur while sending email", error);
  }
};

export default mailSender;
