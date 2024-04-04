"use client"
import Image from "next/image";
import styles from "./page.module.css";
import HomeBanner1 from "./components/HomeBanner1/HomeBanner1";
import HomeBanner2 from "./components/HomeBanner2/HomeBanner2";
import Community from "./components/Community/Community";
export default function Home() {
  return (
    <main >
       <HomeBanner1 />
       <HomeBanner2 />
       
    </main>
  );
}
