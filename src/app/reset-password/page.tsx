import { Suspense } from "react";

import { ResetPasswordForm } from "@/features/auth/reset-password-form";

export const metadata = { title: "New password · Duet" };

export default function ResetPasswordPage() {
  return (
    <main className="flex h-dvh items-center justify-center p-4">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
