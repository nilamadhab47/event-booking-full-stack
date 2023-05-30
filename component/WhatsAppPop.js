import React from 'react'
import { useState } from "react";
import SvgComponent from "./SvgComponent";
import styles from "../styles/WhatsApp.module.css"
import WhatsAppSVG from './WhatsAppSVG';

export default function WhatsAppPop() {
    
      let hide = {
        display: "none",
      };
      let show = {
        display: "block",
      };
    
      const [chatopen, setChatopen] = useState(false);
      const toggle = (e) => {
        setChatopen(!chatopen);
      };
  return (
   <>


  
    <div className={styles.wsContainer}>
      <div className={styles.chatCon}>
        <div className={styles.chatBox}  style={chatopen ? show : hide}>
          <p className= {styles.wsHeader}>Hi There!</p>
          <h5 className= {styles.wsText}>
            We are here to help you! Connect with us on Whatsapp for any
            queries.
          </h5>
          <a
            href="https://wa.link/prqq5a?text=Hii" className={styles.chatWithImage} 
          >
      <WhatsAppSVG/>
          </a>
          <div
            className= {styles.triangleDown}
          ></div>
        </div>
        <div className= {styles.wsLogo}>
          <SvgComponent onClick={toggle} />
          
        </div>
        <div className={styles.ChatWithme}>
          <p>Chat with us</p>
        </div>
      </div>
     
    </div>

   </>
  )
}
