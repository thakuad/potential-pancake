import { LoginForm } from "@/features/auth/login-form";

export const metadata = { title: "Sign in · Duet" };

export default function LoginPage() {
  return (
    <main className="flex h-dvh items-center justify-center p-4">
      <LoginForm />
    </main>
  );
}
