import React, { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import styles from "../styles/Scroll.module.css";

export default function ScrollToTop() {
  
  const [visible, setVisible] = useState(true);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 700) {
      setVisible(true);
    } else if (scrolled <= 700) {
      setVisible(false);
    }
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
             in place of 'smooth' */
    });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisible);
    }
    return () => window.removeEventListener("scroll", toggleVisible)
  }, [toggleVisible])

  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 800) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.top_to_btm}>
      <FaAngleDown
        className={`${styles["icon-position"]} ${styles["icon-style"]}`}
        onClick={scrollToBottom}
        style={{ display: visible ? "none" : "inline" }}
      />
      {showTopBtn && (
        <FaAngleUp
          className={`${styles["icon-position"]} ${styles["icon-style"]} ${styles["transform"]}`}
          onClick={goToTop}
        />
      )}
    </div>
  );
}
