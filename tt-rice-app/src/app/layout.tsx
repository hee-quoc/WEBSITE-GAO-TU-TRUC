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
      <body className="flex min-h-screen flex-col">
        <TRPCReactProvider>
          <Header />
          <main className="flex-grow"> 
            {children}
          </main>
          <Footer />
          <FloatingSocialLinks/>
        </TRPCReactProvider>
        
      </body>
    </html>
  );
}
