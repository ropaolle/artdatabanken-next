import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "../globals.css";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container my-8">{children}</main>
      <Footer />
    </>
  );
}
