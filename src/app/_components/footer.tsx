import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-4 mt-auto text-center">
      <p>
        Built by{" "}
        <Link
          href="https://github.com/EhrichPeter"
          target="_blank"
          className="underline"
        >
          Peter Ehrich
        </Link>
        . Hosted on Vercel. The source code is available on{" "}
        <Link
          href="https://github.com/EhrichPeter/quote"
          target="_blank"
          className="underline"
        >
          GitHub
        </Link>
        .
      </p>
    </footer>
  );
};

export default Footer;
