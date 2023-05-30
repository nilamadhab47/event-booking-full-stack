import { useState, useEffect } from "react";
import vector1 from "../Images/vector1.png";
import vector2 from "../Images/vector2.png";
import vector3 from "../Images/vector3.png";
import vector4 from "../Images/vector4.png";
import Image from "next/image";
import styles from "../styles/Gallery.module.css";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { NextSeo } from "next-seo";
import  Footer from '../component/footer'
import {useRouter} from "next/router";
export default function Gallery({ posts }) {
  const router = useRouter();
  const canonicalLink = process.env.NEXT_PUBLIC_URL + router.pathname;

  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("all");

  useEffect(() => {
    if (active === "all") {
      setCategories(posts);
      return;
    } else {
      const filtered = posts.filter((item) => item.category.includes(active));

      setCategories(filtered);
      console.log(setCategories(filtered));
    }
  }, [active]);
  const Navbar = dynamic(() => import("../component/navbar"), {
    suspense: true,
  });
  console.log(categories);

  return (
    <>
      <NextSeo
        title="Gallery - 18 Candleriggs | Events Venue Glasgow"
        description="With its breathtaking shows, live music and late-night revelry - in a stunning, intimate setting - 18 Candleriggs events venue is Merchant City’s best-kept secret."
        canonical={canonicalLink}
      />
      <Suspense fallback={<div className="loading-lazy">loading....</div>}>
        <Navbar />
      </Suspense>
      <div className={styles.ReportsHeadings}>
        <div className={styles.gallery_btn}>
          <div className={styles.btn_container}>
            <a
              href="#"
              className={styles.btn_main}
              onClick={() => {
                setActive("all");
              }}
            >
              <Image src={vector1} className={styles.gallery_img} alt="" />
              All Photos
            </a>
          </div>
          <div
            className={`${styles["btn_container"]} ${styles["gallery_container"]} ${styles["gallery_Venue"]} ${styles["aTag"]}`}
          >
            <a
              href="#"
              className={styles.btn_main}
              onClick={() => setActive("Venue")}
            >
              <Image src={vector2} className={styles.gallery_img1} alt="" />
              Venue
            </a>
          </div>
          <div className={styles.btn_container}>
            <a
              href="#"
              className={styles.btn_main}
              onClick={() => setActive("Events")}
            >
              {" "}
              <Image src={vector3} className={styles.gallery_img} alt="" />
              Events
            </a>
          </div>
          <div className={styles.btn_container}>
            <a
              href="#"
              className={styles.btn_main}
              onClick={() => setActive("Food")}
            >
              <Image src={vector4} className={styles.gallery_img} alt="" />
              Food
            </a>
          </div>
        </div>
      </div>
      <div
        className={styles.desktopContainer}
        style={{ margin: "18px", overflow: "hidden" ,paddingBottom:"5rem"}}
      >
        <div className="container">
          <div className="row" >
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(0, 1)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>

            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(1, 5).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage? item.smallWebImage : ""}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(5, 9).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage? item.smallWebImage : ""}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(9, 10)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(10, 11)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>

            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(11, 15).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(15, 19).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(19, 20)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(20, 21)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>

            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(21, 25).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(25, 29).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(29, 30)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(30, 31)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(31, 35).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(35, 39).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(39, 40)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(40, 41)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>

            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(41, 45).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={` ${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupChildIsmages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(45, 49).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(49, 50)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(50, 51)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>

            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(51, 55).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(55, 59).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(59, 60)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(60, 61)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(61, 65).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(65, 69).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(69, 70)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(70, 71)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(71, 75).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(75, 79).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(79, 80)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(80, 81)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(81, 85).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(85, 89).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(89, 90)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(90, 91)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(91, 95).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 secondFourGroupImage">
              <div className="row row-cols-1 row-cols-md-2 g-4 secondGroupChilds">
                {posts && posts.length
                  ? categories.slice(95, 99).map((item, i) => (
                      <div className="col" key={i}>
                        <Image
                          width={250}
                          height={300}
                          src={item.smallWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["secondGroupChildsImages"]}`}
                          alt={item.altText}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-6 firstCardImage">
              <div className="col firstCardChilds">
                {posts && posts.length
                  ? categories
                      .slice(99, 100)
                      .map((item, i) => (
                        <Image
                          key={i}
                          width={250}
                          height={300}
                          src={item.bigWebImage}
                          className={`${styles["card-img-top"]}  ${styles["img-fluid"]}  ${styles["firstCardChildImage"]}`}
                          alt={item.altText}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile Gallery 320 to 767 */}
      <div
        className={`${styles["container"]} ${styles["MobileContainer"]}`}
        style={{ margin: "18px", overflow: "hidden" }}
      >
        <div className="row" >
          <div className="col-12 firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(0, 1)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>

          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(1, 5).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12 firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(5, 6)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(6, 10).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(10, 11)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(11, 15).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(15, 16)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(16, 20).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(20, 21)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(21, 25).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(25, 26)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(26, 30).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(30, 31)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(31, 35).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(35, 36)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(36, 40).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(40, 41)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(41, 45).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(45, 46)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(46, 50).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(50, 51)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(51, 55).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(55, 56)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(56, 60).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.bigMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(60, 61)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(61, 65).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(65, 66)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(66, 70).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(70, 71)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(71, 75).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(75, 76)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(76, 80).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(80, 81)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(81, 85).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(85, 86)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(86, 90).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(90, 91)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(91, 95).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-12   firstCardImage">
            {posts && posts.length
              ? categories
                  .slice(95, 96)
                  .map((item, i) => (
                    <Image
                      key={i}
                      width={250}
                      height={300}
                      src={item.bigMobileImage}
                      className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["firstCardMobileImage"]}`}
                      alt={item.altText}
                    />
                  ))
              : null}
          </div>
          <div className="col-12 secondFourGroupImage">
            <div className="row row-cols-2 row-cols-md-2 g-4 secondGroupChilds">
              {posts && posts.length
                ? categories.slice(96, 100).map((item, i) => (
                    <div className="col" key={i}>
                      <Image
                        width={250}
                        height={300}
                        src={item.smallMobileImage}
                        className={`${styles["card-img-top"]} ${styles["img-fluid"]} ${styles["secondGroupMobileImages"]}`}
                        alt={item.altText}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <Footer/>

    </>
  );
}
export async function getServerSideProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/gallery");
  const galleryData = await res.json();
  return {
    props: {
      posts: galleryData.result,
    },
  };
}
