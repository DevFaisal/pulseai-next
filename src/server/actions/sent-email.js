"use server";

import { resend } from "@/lib/resend";

export const sendEmail = async ({ email, subject, from, react }) => {
  return resend.emails.send({
    to: email,
    subject,
    from,
    react,
  });
};
