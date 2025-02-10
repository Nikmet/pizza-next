import { Resend } from "resend";
import { PayOrderTemplate } from "../components/shared/email-templates/pay-order";
import { ReactNode } from "react";

export const sendEmail = async (to: string, subject: string, react: ReactNode) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject,
        react
    });

    if (error) {
        throw error;
    }

    return data;
};
