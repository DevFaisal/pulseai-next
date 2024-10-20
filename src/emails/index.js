// import { resend } from "@/lib/resend";

import { Resend } from "resend";

const resendApiKey = "re_huDC7QQy_Ktzukic2KHxgjLaYHBqLsNVK";

const resend = new Resend(resendApiKey);

export const sendEmail = async ({ email, subject, from, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      to: email,
      subject,
      from,
      html,
    });

    if (data) {
      return data;
    }

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
