import type { Metadata } from "next";
import { Michroma } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "도작",
  description: "Plagiarism Site",
};

const michroma = Michroma({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${michroma.className} bg-[#0c0c0c] antialiased`}>
        {children}
      </body>
    </html>
  );
}
