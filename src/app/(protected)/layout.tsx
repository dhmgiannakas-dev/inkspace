import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";

/** Protects private pages and displays their header and footer. */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <MainHeader />
      {children}
      <MainFooter />
    </>
  );
}