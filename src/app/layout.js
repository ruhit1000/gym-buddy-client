import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Iron Pulse - Fitness & Gym Management Platform",
  description: "Iron Pulse is a comprehensive fitness and gym management platform designed to streamline operations, enhance member engagement, and optimize business performance. Our platform offers a wide range of features including membership management, class scheduling, payment processing, and performance tracking. With Iron Pulse, gym owners and fitness professionals can efficiently manage their facilities, while members enjoy a seamless experience with easy access to classes, workouts, and personalized fitness plans. Join us in revolutionizing the fitness industry with Iron Pulse.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main>{children}</main>
      </body>
    </html>
  );
}
