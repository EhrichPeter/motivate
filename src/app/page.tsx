import Header from "./_components/header";
import Footer from "./_components/footer";
import Content from "./_components/content";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center container">
      <Header />
      <Content />
      <Footer />
    </main>
  );
}
