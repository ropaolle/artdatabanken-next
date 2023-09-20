import Footer from "@/components/Footer";
import Header from "@/components/Header";
import getUser from "@/lib/auth";
import "../globals.css";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <>
      <Header user={user} />
      <main className="container my-8">{children}</main>
      <Footer user={user} />
    </>
  );
}
