 "use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="logo" href="/" onClick={close}>
          <span>H</span> Habibur Rahaman
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <i /><i />
        </button>

        <nav className={open ? "nav open" : "nav"}>
          <Link href="/#about" onClick={close}>About</Link>
          <Link href="/#services" onClick={close}>Services</Link>
          <Link href="/work" onClick={close}>Work</Link>
          <Link href="/#process" onClick={close}>Process</Link>
          <Link className="nav-cta" href="/contact" onClick={close}>Let&apos;s Talk ↗</Link>
        </nav>
      </div>
    </header>
  );
}
