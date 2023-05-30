import Image from "next/image";
import menu1 from "../Images/menu1.png"
import menu2 from "../Images/menu2.png"
import menu3 from "../Images/menu3.png"
import menu4 from "../Images/menu4.png"
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import styles from "../styles/Menu.module.css";
import Footer from '../component/footer'
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";

export default function Menu() {
  const router = useRouter();
  const canonicalLink = process.env.NEXT_PUBLIC_URL + router.pathname;

  const Navbar = dynamic(() => import("../component/navbar"), {
    suspense: true
  });

  return (
  <>
    <NextSeo
        title="Food & Drinks Menu - 18 Candleriggs | Events Venue Glasgow"
        description="18 Candleriggs Brunch is served every day from 9 a.m. - 4 p.m.at the best events venue in Glasgow. Come and enjoy fresh local products."
        canonical={canonicalLink}
    />
 <Suspense fallback={<div className="loading-lazy">loading....</div>}>
<Navbar />
</Suspense>
<div className="container">
    <div className={styles.menuContainer}>
      <h1 className={styles.menu_heading1}>18 Candleriggs</h1>
        <div className="menu--menu1">
          <Image src={menu1} alt="menu" className="menu--menu1--image1 img-fluid" />
        </div>
        <div className="menu--menu1">
          <Image src={menu2} alt="menu" className="menu--menu1--image1 img-fluid"  style={{marginTop:"1rem"}} />
        </div>
        <div className="menu--menu1">
          <Image src={menu3} alt="menu" className="menu--menu1--image1 img-fluid"   style={{marginTop:"1rem"}}/>
        </div>
        <div className="menu--menu1">
          <Image src={menu4} style={{marginBottom: "2rem" ,marginTop:"1rem"}} alt="menu" className="menu--menu1--image1 img-fluid" />
        </div>
      </div>
      </div>
      <Footer/>
      
  </>
  )
}

