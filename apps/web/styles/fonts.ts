import { Inter } from "next/font/google"
import localFont from "next/font/local"

export const unbounded = localFont({
  src: "../styles/Unbounded-Variable.woff2",
  variable: "--font-unbounded",
  weight: "300 700",
  display: "swap",
  style: "normal",
})

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})
