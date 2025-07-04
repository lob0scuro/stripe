import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Matt's Appliances - Stripe Dashboard",
  description: "Matt's Appliances - Stripe Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="container">{children}</div>
        <Footer />
        <Toaster position="bottom-right" reverseOrder={true} />
      </body>
    </html>
  );
}
