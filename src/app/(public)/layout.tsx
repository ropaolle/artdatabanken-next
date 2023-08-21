import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import getUser from "@/lib/auth";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <>
      <Header user={user} />
      <main className="flex items-center justify-center p-16 lg:justify-between">{children}</main>
      <Footer user={user} />
    </>
  );
}
