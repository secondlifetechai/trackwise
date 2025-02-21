import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrackWise",
  description: "Track Your Website’s Success Like Never Before",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
