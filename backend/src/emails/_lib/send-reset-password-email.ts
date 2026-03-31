import ForgotPasswordEmail from "../_components/forgot-password.js";
import { resend } from "./resend.js";

type SendResetPasswordEmailParams = {
  from: string;
  to: string;
  url: string;
  name: string;
};

export async function sendResetPasswordEmail({
  from,
  to,
  name,
  url,
}: SendResetPasswordEmailParams) {
  await resend.emails.send({
    from,
    to,
    subject: "Verify your Careerly account",
    react: ForgotPasswordEmail({
      url,
      name,
    }),
  });
}
