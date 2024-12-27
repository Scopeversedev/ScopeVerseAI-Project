import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import CustomerChats from "@/components/CustomerChats";
import { ToastContainer,Slide } from 'react-toastify';
import TawkTo from "@/components/Tawk";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ScopeVerse Ai",
  description: "For token analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <TawkTo/> */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
          />
        <CustomerChats/>
        {children}
        <Footer/>
        
      

      </body>
      
    </html>
  );
}
