"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import HomeBanner1 from "./components/HomeBanner1/HomeBanner1";
import HomeBanner2 from "./components/HomeBanner2/HomeBanner2";
import HomePage from "./components/Home/Home";


export default function Home() {
  const [isloggedin, setIsloggedin] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user login status
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/checklogin', {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setIsloggedin(true);
        }
      })
      .catch(err => {
        console.error("Error checking user login status:", err);
      });

    // Fetch admin login status
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/checklogin', {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setIsAdmin(true);
        }
      })
      .catch(err => {
        console.error("Error checking admin login status:", err);
      });
  }, []);

  return (
    <main>
      {!isloggedin && !isAdmin && <HomePage />}
      <HomeBanner1 />
      {(isloggedin || isAdmin) && <HomeBanner2 />}

    </main>
  );
}
