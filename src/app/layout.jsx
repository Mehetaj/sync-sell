import { Metal_Mania } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Providers from "./store/Providers";
import AuthProvider from "../components/AuthSessionProvider";
import { ToastContainer } from "react-toastify";

const metalMania = Metal_Mania({
  subsets: ["latin"],
  weight: "400", // Adjust weight if needed
  display: "swap",
});

export const metadata = {
  title: "SynC",
  description: "Death Metal fashion and lifestyle brand",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={metalMania.className}>
      <body>
        <Providers>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
