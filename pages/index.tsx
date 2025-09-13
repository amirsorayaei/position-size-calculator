import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import PositionCalculator from "@/src/PositionCalculator";
import AiCalculator from "@/src/AiCalculator";
import { CalculateProvider } from "@/src/CalculateContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Position Size Calculator</title>
        <meta
          name="description"
          content="This is an app for calculating trading position size."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <CalculateProvider>
          <AiCalculator />
          <PositionCalculator />
        </CalculateProvider>
      </div>
    </>
  );
}
