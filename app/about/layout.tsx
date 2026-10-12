import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Digital Habibur | Best Web Developer in Nabadwip",
  description: "Learn more about Habibur Rahaman (Digital Habibur), a top-rated custom WordPress, Next.js, and web application developer based in Nabadwip, West Bengal.",
  keywords: ["Habibur Rahaman", "Digital Habibur", "Web Developer in Nabadwip", "WordPress Expert Nadia", "PHP Developer", "Full-Stack Developer India"]
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}