import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <Link className="logo footer-logo" href="/"> <span>H</span> Habibur Rahaman</Link>
          <p>Custom web & software solutions built around real business problems.</p>
        </div>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
          <a href="mailto:info@digitalhabibur.in">Email</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Habibur Rahaman. All rights reserved.</span>
        <span>Built for clarity, performance and growth.</span>
      </div>
    </footer>
  );
}
