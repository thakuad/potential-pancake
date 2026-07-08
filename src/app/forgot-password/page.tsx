import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";

export const metadata = { title: "Reset password · Duet" };

export default function ForgotPasswordPage() {
  return (
    <main className="flex h-dvh items-center justify-center p-4">
      <ForgotPasswordForm />
    </main>
  );
}
