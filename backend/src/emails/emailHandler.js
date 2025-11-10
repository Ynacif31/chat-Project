import { create } from "domain"
import { createWelcomeEmailTemplate } from "./emailTemplates";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: [email],
        subject: "Welcome to Chatify!",
        html: createWelcomeEmailHTML(name, clientURL)
    });

    if (error) {
        console.error("Error sending welcome email:", error);
    } else {
        console.log("Welcome email sent:", data);
    }
}