import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "../globals.css";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  // TODO: https://github.com/vercel/next.js/issues/50119
  // throw new Error('Public page layout error - should trigger /app/global-error.tsx')

  return (
    <>
      <Header />
      <main className="container my-8 flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
