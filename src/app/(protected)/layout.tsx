import "../globals.css";
import "tw-elements/dist/css/tw-elements.min.css";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import getUser from "@/lib/auth";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user) {
    redirect("/login/?message=You are not authorized to access that resource.");
  }

  return (
    <>
      <Navbar user={user} />
      <main className="flex items-center justify-center p-16 lg:justify-between">{children}</main>
      <Footer user={user} />
    </>
  );
}