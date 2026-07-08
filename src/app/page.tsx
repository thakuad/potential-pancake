import { redirect } from "next/navigation";

// The middleware redirects unauthenticated visitors to /login.
export default function Home() {
  redirect("/chat");
}
