import "~/styles/globals.css";
// import '~/styles/index.css';
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Header from "~/app/_components/Header";
import Footer from "~/app/_components/Footer";
import { TRPCReactProvider } from "~/trpc/react";
import { FloatingSocialLinks }from "~/app/_components/ui/FloatingSocialLinks"
import Image from "next/image";

export const metadata: Metadata = {
  title: "gaotutruc",
  description: "Website for Tu Truc company",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <Header />
          <main className="flex-grow"> {/* 1. Add a <main> tag for content */}
            {children}
          </main>
          <Footer />
          <FloatingSocialLinks/>
        </TRPCReactProvider>
        
      </body>
    </html>
  );
}
