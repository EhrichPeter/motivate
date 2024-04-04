import Footer from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import type { ReactElement } from "react";

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center container py-10">
        {children}
      </main>
      <Footer />
    </>
  );
}
