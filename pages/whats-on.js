import { useState, useEffect } from "react";
import { AiFillCalendar } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { GiTicket } from "react-icons/gi";
import styles_home from "../styles/WhatsOn.module.css";
import { MdPerson } from "react-icons/md";
import { ImTicket } from "react-icons/im";
import We_Were_Here from "../Images/We_Were_Here.png";
import header_top_img from "../Images/header_top_img.png";
import Image from "next/image";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import dayjs from "dayjs";
import Link from "next/link";

import style from "../styles/Header.module.css";
import soldOut from "../Images/soldOut.png";
import cancelled from "../Images/cancelled.png";
import { Roboto } from '@next/font/google'
import styles from "../styles/Home.module.css";
import Footer from '../component/footer'
import {NextSeo} from "next-seo";
import getActiveEvents from "../services/activeEvents";
import {useRouter} from "next/router";
const roboto = Roboto({ subsets: ['Roboto'] , weight: '400'})
export default function WhatsOn(props) {
    const router = useRouter();
    const canonicalLink = process.env.NEXT_PUBLIC_URL + router.pathname;

  const [search, setSearch] = useState("");

  const [events, setEvents] = useState(JSON.parse(props.events));
  const [eventPerPage,setEventPerPage ] = useState(99);
  // const fetchData = () => {
  //   return fetch("/api/event/active")
  //     .then((response) => response.json())
  //     .then((data) => setEvent(data.result));
  // };


  // useEffect(() => {
  //   fetchData();
  // }, []);

  // 50 event
  
  const handleMoreEvents = () => {
setEventPerPage(eventPerPage+9)
  };
  const Navbar = dynamic(() => import("../component/navbar"), {
    ssr: false,
  });

  
  return (
    <>
        <NextSeo
            title="Whats On - - 18 Candleriggs | Events Venue Glasgow"
            description="What's On At Glasgow's Coolest Event Venue? Check out all the upcoming events at 18 Candleriggs!"
            canonical={canonicalLink}
        />

      <Suspense fallback={<div className="loading-lazy">loading....</div>}>
        <Navbar search={search} setSearch={setSearch} />
      </Suspense>
      <div className={style.heading}>
        <h1  className={styles.pWhatsOn}>
          Glasgow&apos;s Leading Event Space
        </h1>
       
      </div>
      {/*  */}
      <div className={styles_home.whats_on_top}>

      <div className={styles.frontImageFlex}>
                  <div className={styles.frontImageFlexItem}>
                    {events
                          .filter((data) => {
                            if (search == "") {
                              return data;
                            } else if (
                              data.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return data;
                            }
                          })
                          .slice(0 , eventPerPage)
                          .map((data, i) => (
                            <div
                              className={`${styles["col"]} ${styles["home_event"]} ${styles["homeEventCol "]} `}
                              key={i}
                              style={{ marginBottom: "60px" }}
                            >
                              {/* <div className="card"> */}
                              {/* <Link
                                to={`/event/${data.eventName
                                  .replaceAll(" ", "-")
                                  .toLowerCase()}`}
                              >
                            </Link> */} 
                             
                              <Link
                                href={`/event/${data.seoFriendlyURL}`}
                              >
                                <span
                          className={styles_home.event}
                          style={{ position: "absolute" }}
                        >
                          {data.eventType === "Sold Out" ? (
                            <Image
                              src={soldOut}
                              className={styles_home.eventCancelled1}
                            />
                          ) : data.eventType === "Cancelled" ? (
                            <Image
                              src={cancelled}
                              className={styles_home.eventCancelled1}
                            />
                          ) : null}
                        </span>
                                <Image
                                  src={!data.desktopImage ? "https://dummyimage.com/335x450/000000/ffffff.png&text=NO+IMAGE++(size+:+335+x+450)" : data.desktopImage}
                                  style={{ borderRadius: "50px 0px 0px 0px " }}
                                  className={`${styles["card-img-top"]}`}
                                  alt="..."
                                  width={450}
                                  height={450}
                                  priority={true}
                                />
                              </Link>

                              <div
                                className={`${styles["card-body"]} ${styles["cardbodyh5"]} ${styles["background-color-home"]} `}
                                style={{
                                  background: "#270F33",
                                  fontFamily: "Roboto",
                                  position: "relative",
                                  bottom: "4px",
                                }}
                              >
                                <h5 className={styles.card_title}>
                                  {data.name.slice(0, 50)}
                                </h5>
                                <p
                                  className={`${styles["card-text"]} ${styles["cardTitle"]} `}
                                >
                                  {data.title.slice(0, 80)}
                                </p>
                                <p
                                  className={`${styles["card-text"]} ${styles["text-1"]} `}
                                >
                                  {data.shortDescription.slice(0, 160)}
                                </p>
                                <div className={styles.flexItems}>
                                {data.price != 0 ? (
                                  <p
                                    className={`${styles["card-text"]} ${styles["text-2"]} `}
                                  >
                                    <ImTicket className="ticketIcon" /> {" "}
                                    Tickets &#163;{data.price} 
                                    
                                    {
                                data.bookingFee ===0? "": <>  + BF &#163;
                                {data.bookingFee}
                                </>
                              }
                                   
                                  </p>
                                ) : (
                                  <p
                                    className={`${styles["card-text"]} ${styles["text-2"]} `}
                                  >
                                    <ImTicket className="ticketIcon" /> {" "} Free
                                    Event
                                  </p>
                                )}
                                  <p
                                  className={`${styles["card-text"]} ${styles["date"]} `}
                                >
                                  <AiFillCalendar
                                    style={{ marginTop: "-3px" }}
                                  />
 {" "}
                                  {dayjs(data.eventDate).format("MMM D YYYY")}
                                </p>
                                 <p
                                  className={`${styles["card-text"]} ${styles["textStartTime"]} `}
                                  >
                                  <AiFillClockCircle
                                    className="timeIcon"
                                    style={{
                                      position: "relative",
                                      top: "-1px",
                                    }}
                                    />{" "}
                                  Start {data.startTime.toLowerCase()}
                                  {""} | Doors{" "}
                                  {data.doorOpeningTime}
                                </p> 
                                
                              
                                    </div>
                                {data.age === "18+" ||
                                data.age === "All Ages" ? (
                                  <p id={styles_home.ages}
                                    className={`${styles["card-text"]} ${styles["CardTextAge"]} `} 
                                  >
                                    <MdPerson style={{ marginTop: "-3px" }} />
                                    &nbsp;Age:&nbsp;{data.age}
                                  </p>
                                ) : null}

                                {data.eventType === "Live" ? (
                                  <a href={data.link} target={"_blank"}>
                                    <button
                                      className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["button"]} `}
                                    >
                                      Book Tickets
                                    </button>
                                  </a>
                                ) : data.eventType === "Private Booking" ? (

                                    <button
                                      className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["button"]} ${styles["cancelledBtn"]} `}
                                      style={{
                                        background: "#FFFFFF",
                                        color: "#000000",
                                        cursor: "not-allowed",
                                      }}
                                    >
                                      Private Booking
                                    </button>

                                ) : data.eventType === "Sold Out" ? (

                                    <button
                                      className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["button"]} ${styles["soldOutbtn"]} `}
                                      style={{
                                        background: "#D01010",
                                        color: "#FFFFFF",
                                        cursor: "not-allowed",
                                      }}
                                    >
                                      Sold Out
                                    </button>

                                ) : data.eventType === "Cancelled" ? (

                                    <button
                                      className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["button"]} ${styles["cancelledBtn"]}  `}
                                      style={{
                                        background: "#FFFFFF",
                                        color: "#000000",
                                        cursor: "not-allowed",
                                      }}
                                    >
                                      Cancelled
                                    </button>

                                ) : null}
                              </div>
                            </div>
                          ))
                      }
                  </div>
                </div>
      </div>
      {/*  */}
      <div className={styles_home.whats_on_bottom}>

    < div  className={roboto.className}>
      

      <div className={styles_home.exceedContainer}>
        <div className={styles_home.HeaderItems}>
          <div className={styles_home.whatsOn}>
            {events
              .filter((userss) => {
                if (search == "") {
                  return userss;
                } else if (
                  userss.eventName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return userss;
                }
              })
              .slice(0, eventPerPage)
              .map((userss, i) => {
                return (
                  <div className={styles_home.header_main} key={i}>
                    <div className={styles_home.header_img}>
                      <Link 
                      
                      href={`/event/${userss.seoFriendlyURL}`}
                      
                      >
                        <span
                          className={styles_home.event}
                          style={{ position: "absolute" }}
                        >
                          {userss.eventType === "Sold Out" ? (
                            <Image
                              src={soldOut}
                              className={styles_home.eventCancelled1}
                            />
                          ) : userss.eventType === "Cancelled" ? (
                            <Image
                              src={cancelled}
                              className={styles_home.eventCancelled1}
                            />
                          ) : null}
                        </span>

                        <Image
                          width={300}
                          height={300}
                          src={
                            !userss.desktopImage
                              ? "https://dummyimage.com/333x450/000000/0011ff.png&text333x450"
                              : userss.desktopImage
                          }
                          className={styles_home.imgheader}
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className={styles_home.header_container}>
                      <div className={styles_home.heading_item_top}>
                        <h2>{userss.name.slice(0, 140)}</h2>
                        <p className={styles_home.para_main}>
                          <Link
                            style={{ textDecoration: "none", color: "white" }}
                            href={`/event/${userss.seoFriendlyURL}`}
                          >
                            {userss.title.slice(0, 80)}
                          </Link>
                        </p>

                        <p className={styles_home.para_Child}>
                          {userss.shortDescription.slice(0, 160)}
                        </p>
                      </div>
                      <div className={styles_home.event_container_btn_para}>
                        <div className={styles_home.header_item_bottom}>
                          <span className={styles_home.headerDateSpan}>
                            <AiFillCalendar
                              className={styles_home.react_icon}
                              style={{ marginRight: "3px" }}
                            />
                            {dayjs(userss.eventDate).format("MMM D YYYY")}
                            {/* <AiFillCalendar className="react_icon"  style={{'marginRight':'3px'}}/> {moment(userss.date.slice(0,10)).format("MMM Do YYYY")} */}
                          </span>

                          <span
                            className={styles_home.headerTimeSpan}
                          
                          >
                            <AiFillClockCircle className={styles_home.react_icon} />{" "}Start&nbsp;
                            {userss.startTime}
                            {/* {userss.showStartZone}  */}
                            &nbsp;| Doors&nbsp;
                            {userss.doorOpeningTime}
                          </span>
                       
                          {userss.age == "18+" || userss.age == "All Ages" ? (
                            <p className={styles_home.HeaderCardTextAge} id={styles_home.ages}>
                              <MdPerson style={{ marginTop: "-3px" }} />
                              &nbsp;Age:&nbsp;{userss.age} 
                            </p>
                          ) : (
                            <p  
                            className={styles_home.HeaderCardTextAge}
                            style={{ marginTop: "-3px","visibility":"hidden" }}
                            >don't show</p>
                          )}

                          {userss.price != 0 ? (
                            <span className={styles_home.headerTicketSpan}>
                              <ImTicket className={styles_home.react_icon} /> Tickets
                              &#163;
                              {userss.price}
                              {
                                userss.bookingFee ===0? "": <> +
                                
                                
                                {userss.bookingFee}
                                </>
                              }
                               
                            </span>
                          ) : (
                            <span className={styles_home.headerTicketSpan}>
                              {" "}
                              <ImTicket
                              className={styles_home.react_icon}
                                style={{
                                  position: "relative",
                                  bottom: "2px",
                                 
                                  right: "2px",
                                }}
                              /> Free Event
                            </span>
                          )}
                        </div>
                        {userss.eventType === "Live" ? (
                          
                            <a href={userss.link} target={"_blank"}>


                            <button className={`${styles_home["btn-hover"]}`}>
                              Book Tickets{" "}
                            </button>
                            </a>
                          
                        ) : userss.eventType === "Private Booking" ? (
                             
                            <button
                              className={styles_home.event_type} id={styles_home.privateBookingButton}
                              style={{
                                
                                background: "#FFFFFF",
                                color: "#000000",
                                cursor: "not-allowed",
                              }}
                            >
                              Private Booking{" "}
                            </button>

                        ) : userss.eventType === "Cancelled" ? (

                            <button
                              className=""
                              style={{
                                background: "#FFFFFF",
                                color: "#000000",
                                cursor: "not-allowed",
                              }}
                            >
                              Cancelled{" "}
                            </button>

                        ) : userss.eventType === "Sold Out" ? (

                            <button
                              className=""
                              style={{
                                background: "#D01010",
                                color: "#FFFFFF",
                                cursor: "not-allowed",
                              }}
                            >
                              Sold Out{" "}
                            </button>

                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {events.numberOfResults > eventPerPage ? <button className={styles_home.bottom_home_btn1} onClick={handleMoreEvents}>
            {" "}
            More Events{" "}
          </button>: ""}
        </div>
      </div>
    </div>
      </div>
          <div
            className={`${styles_home["header_item_img"]} ${styles_home["container"]}`}
          >
            <div className={styles_home.we_are_here}>
              <Image
                src={header_top_img}
                className={styles_home.header_top_img}
                alt=""
              />
              <Image
                src={We_Were_Here}
                className={styles_home.we_Were_Here}
                alt=""
              />
            </div>
            <div className={styles_home.header_item_h1}>
              <p>
                MTV ~ Janey Godley ~ Clean Bandit ~ Ramond Mearns ~ Nicholas
                Macdonald ~ Dmitri From Paris ~ Alabama3 ~ Des McLean ~ Dragart
                ~ Karen Dunbar ~ Isaac Butterfield ~ Paul Riley ~ Ashley Storrie
                ~ Groove Theory ~ Soul Nation ~ Gary Little ~ Ro Campbell ~ Adam
                Vincent Rowe ~ Keith Carter ~ Stuart Mitchell ~ Motown Brothers
                ~ Christina Bianco ~ Jollyboat ~ Chris Henry
              </p>
            </div>
          </div>
          <Footer/>

    </>
  );
}
export async function getStaticProps() {
  const activeEvents = await getActiveEvents();

  return {
    props: {
      events: JSON.stringify(activeEvents),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}