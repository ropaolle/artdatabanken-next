import "../globals.css";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import getUser from "@/lib/auth";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user) {
    redirect("/login/?message=You are not authorized to access that resource.");
  }

  return (
    <>
      <Header user={user} />
      <main className="container my-8">{children}</main>
      <Footer user={user} />
    </>
  );
}
