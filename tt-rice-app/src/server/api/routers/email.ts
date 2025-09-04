import { z } from "zod";
import { Resend } from "resend";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { ReactElement } from 'react';
import { env } from "~/env";
import ContactFormEmail from "~/shared/ContactFormEmail"; // Assuming you create this email template

const resend = new Resend(env.RESEND_API_KEY);

export const emailRouter = createTRPCRouter({
  sendContactForm: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(1, "Phone number is required"),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, phone, message } = input;

      try {
        await resend.emails.send({
          from: "Gao Tu Truc<contact@nhamaygaotutruc.com>",
          to: ["contact@tutruc.com"],
          subject: `Liên hệ từ người dùng website: ${name}`,
          react: ContactFormEmail({ name, email, phone, message }) as ReactElement,
        });
        
        return { success: true };
      } catch (error) {
        console.error("Email sending failed:", error);
        throw new Error("Could not send email. Please try again.");
      }
    }),
});
