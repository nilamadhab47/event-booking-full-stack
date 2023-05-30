import React, { useState } from "react";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import logo_196x196 from "../Images/logo_196x196.png";
export default function NavBar({search, setSearch}) {

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(search);
  };
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle(styles.responsive_nav);
  };
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <>
      <header className={styles.navbarHeader}>
        <h3>
          <Link href="/">
            <Image
              width={200}
              height={200}
              src={logo_196x196}
              alt="logo"
              className={styles.navbarImage}
            />
          </Link>{" "}
        </h3>

        <form
          action="#"
          style={{ color: "#9ED9ED" }}
          className={styles.firstSearchBar}
        >
          <FaSearch
            style={{ color: "#9E9D9D", display: "none" }}
            className={styles.FaSearch}
          />{" "}
          <input
            placeholder="&#xF002;"
            style={{
              fontFamily: "FontAwesome, Arial",
              fontStyle: "normal",
              padding: "9px",
            }}
            type="search"
            className={styles.search_input}
            onChange={handleSearch}
          />
        </form>
        <nav className={styles.newNavbarA} ref={navRef}>
          <Link
            href="/"
            className={currentRoute === "/" ? "text-warning" : styles.atag}
          >
            Home
          </Link>
          <Link
            href="/whats-on"
            className={
              currentRoute === "/whats-on" ? "text-warning" : styles.atag
            }
          >
            What&apos;s On
          </Link>
          <Link
            href="/book-venue"
            className={
              currentRoute === "/book-venue" ? "text-warning" : styles.atag
            }
          >
            Book Venue
          </Link>
          <Link
            href="/gallery"
            className={
              currentRoute === "/gallery" ? "text-warning" : styles.atag
            }
          >
            Gallery
          </Link>
          <Link
            href="/menu"
            className={currentRoute === "/menu" ? "text-warning" : styles.atag}
          >
            Menu
          </Link>
          <Link
            href="/contact"
            className={
              currentRoute === "/contact" ? "text-warning" : styles.atag
            }
          >
            Contact Us
          </Link>
          <button
            className={`${styles["nav-btn"]} ${styles["nav-close-btn"]}`}
            onClick={showNavbar}
          >
            <FaTimes />
          </button>
        </nav>
        <button className={`${styles["nav-btn"]}`} onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </>
  );
}
