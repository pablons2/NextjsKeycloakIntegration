
import { Metadata } from "next";
import '@/src/style/globals.css'
export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        {children}
      </body>
    </html>
  );
}
