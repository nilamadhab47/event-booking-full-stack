import React, { Suspense } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useState } from "react";
import dayjs from "dayjs";
import { MdPerson } from "react-icons/md";
import { ImTicket } from "react-icons/im";
import { AiFillClockCircle, AiFillCalendar } from "react-icons/ai";
import dynamic from "next/dynamic";
import BannerImage from "../component/banner-image";
import { NextSeo } from "next-seo";
import { HiLocationMarker } from "react-icons/hi";
import soldOut from "../Images/soldOut.png";
import cancelled from "../Images/cancelled.png";
import Footer from "../component/footer";
import getActiveEvents from "../services/activeEvents";
import getBanners from "../services/getBanner";
import getMustSeeEvents from "../services/getMustSeeEvents";
import backgroundFive from "../Images/backgroundFive.png"

const Navbar = dynamic(() => import("../component/navbar"), {
  suspense: true,
});
const ScrollToTop = dynamic(() => import("../component/ScrollToTop"), {
  suspense: true,
});

export default function Index(props) {
  const [events, setEvents] = useState(JSON.parse(props.events));
  const [banners, setBanners] = useState(JSON.parse(props.banners));
  const [mustSeeEvents, setMustSeeEvents] = useState(
    JSON.parse(props.mustSeeEvents)
  );

  console.log(events);
  console.log(banners);
  console.log(mustSeeEvents);

    const [eventPerPage, setEventPerPage] = useState(9);
    const [search, setSearch] = useState("");

    const handleMoreEvents =()=>{
      setEventPerPage(eventPerPage + 9)
    }

  const hideEventDetails = {
    showDetails: {
      // visibility: "hidden",
    },
    dontShowDetails: {
      visibility: "hidden",
    },
  };

    return (
        <>
            <NextSeo
                title="18 Candleriggs | Events Venue Glasgow"
                description="Hire a unique and stylish venue for your event in central Glasgow. From intimate gatherings to large-scale corporate events, 18 Candleriggs offers a fully flexible venue with a difference."
                canonical={process.env.NEXT_PUBLIC_URL}
            />
            <Suspense fallback={<div className="loading-lazy">loading....</div>}>
                <Navbar search={search} setSearch={setSearch}/>
            </Suspense>
            <div className={styles.exceedContainer} style={{overflow: "hidden"}}>
                <div className={styles.containerFirst}>
                    <div className={styles.f_cont}>

                        <BannerImage banners={banners}/>
                        <Suspense fallback={`Loading...`}>
                            <ScrollToTop/>
                        </Suspense>

            <div className={styles.container}>
              <div className={styles.wts_on}>
                <div className={styles.Link}>
                  <h2 className={styles.pWhat_on}>
                    What&apos;s On At Glasgow&apos;s Coolest Event Space.
                  </h2>
                  <h1 className={styles.pWhat_on2}>
                    What&apos;s On At Glasgow&apos;s Coolest Event Space.
                  </h1>
                  <div className={styles.wtsViewDiv}>
                    <p
                      className={styles.wtsView}
                      style={{
                        fontSize: "20px",
                        fontWeight: "500",
                      }}
                    >
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "Black",
                        }}
                        href="/"
                        className={styles.home_view_all}
                      >
                        View All
                      </Link>
                    </p>
                  </div>
                </div>

                <div className={styles.frontImageFlex}>
                  <div className={styles.frontImageFlexItem}>
                    {events && events.length
                      ? events
                          .filter((data) => {
                            if (search === "") {
                              return data;
                            } else if (
                              data.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return data;
                            }
                          })
                          .slice(0, eventPerPage)
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
                              <Link href={`/event/${data.seoFriendlyURL}`}>
                                <span
                                  className={styles.homeEvent}
                                  style={{ position: "absolute" }}
                                >
                                  {data.eventType === "Sold Out" ? (
                                    <Image
                                      src={soldOut}
                                      className={styles.eventCancelled1}
                                    />
                                  ) : data.eventType === "Cancelled" ? (
                                    <Image
                                      src={cancelled}
                                      className={styles.eventCancelled1}
                                    />
                                  ) : null}
                                </span>
                                <Image
                                  src={
                                    !data.desktopImage
                                      ? "https://dummyimage.com/335x450/000000/ffffff.png&text=NO+IMAGE++(size+:+335+x+450)"
                                      : data.desktopImage
                                  }
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

                                  position: "relative",
                                  bottom: "4px",
                                }}
                              >
                                <h4 className={styles.card_title}>
                                  {data.name.slice(0, 50)}
                                </h4>
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
                                      <ImTicket className="ticketIcon" />{" "}
                                      Tickets &#163;{data.price}
                                      {data.bookingFee === 0 ? (
                                        ""
                                      ) : (
                                        <>
                                          {" "}
                                          + BF &#163;
                                          {data.bookingFee}
                                        </>
                                      )}
                                    </p>
                                  ) : (
                                    <p
                                      className={`${styles["card-text"]} ${styles["text-2"]} `}
                                    >
                                      <ImTicket className="ticketIcon" /> Free
                                      Event
                                    </p>
                                  )}
                                  <p
                                    className={`${styles["card-text"]} ${styles["date"]} `}
                                  >
                                    <AiFillCalendar
                                      style={{ marginTop: "-3px" }}
                                    />{" "}
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
                                    {""} | Doors {data.doorOpeningTime}
                                  </p>
                                </div>
                                {data.age === "18+" ||
                                data.age === "All Ages" ? (
                                  <p 
                                    className={`${styles["card-text"]} ${styles["CardTextAge"]} `}
                                  >
                                    <MdPerson style={{ marginTop: "-3px" }} />
                                    &nbsp;Age:&nbsp;{data.age}
                                  </p>
                                ) : null}

                                {data.eventType === "Live" ? (
                                  <a href={data.link} target={"_blank"}>
                                    <button
                                      className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["btnPrimaryTop"]} ${styles["button"]} `}
                                    >
                                      Book Tickets
                                    </button>
                                  </a>
                                ) : data.eventType === "Private Booking" ? (
                                  <button
                                    className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["btnPrimaryTop"]} ${styles["button"]} ${styles["cancelledBtn"]} `}
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
                                    className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["btnPrimaryTop"]} ${styles["button"]} ${styles["soldOutbtn"]} `}
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
                                    className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["btnPrimaryTop"]} ${styles["button"]} ${styles["cancelledBtn"]}  `}
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
                      : null}
                  </div>
                </div>

                {events.length > eventPerPage ? (
                  <button
                    className={styles.bottom_home_btn}
                    onClick={handleMoreEvents}
                  >
                    More Events
                  </button>
                ) : (
                  ""
                )}
                <div>
                  {mustSeeEvents.length === 3 ? (
                    <div className={styles.mustSeeEvents}>
                      <div className={styles.wts_header}>
                        <h2 className={styles.wts_header_h1}>
                          Must See Events
                        </h2>
                        <p className={styles.wts_header_p}>View All</p>
                      </div>
                      <div className={`${styles["card-imgs"]}`}>
                        <div className="">
                          <div className={`${styles["card-images"]}`}>
                            {mustSeeEvents.slice(0, 1).map((item, i) => (
                                <Link href={`/event/${item.eventData.seoFriendlyURL}`} >
                              <div className={styles.event_img} key={i}>
                                  <img
                                    src={item.desktopImage}
                                    alt="previews"
                                    className={`${styles["images-events"]} ${styles["imageFirst"]}`}
                                  ></img>
                              </div>
                            </Link>
                            ))}

                            <div className="event_img2">
                              <Link
                                href={`/event/${mustSeeEvents[1].eventData.seoFriendlyURL}`}
                              >
                                <img
                                  alt="previews"
                                  src={mustSeeEvents[1].desktopImage}
                                  className={`${styles["images-events2"]} `}
                                ></img>
                              </Link>

                              {mustSeeEvents.slice(1, 2).map((event) => (
                                <>
                                <div
                                  className={styles.event_div}
                                  style={event.showEventDetails === true ? hideEventDetails.showDetails : hideEventDetails.dontShowDetails}
                                >
                                  <div className={styles.event_container}>
                                    <h3
                                      className={styles.event_container_heading}
                                    >
                                      {event.eventData.name}
                                    </h3>
                                    <p className={styles.mobile_view_para}>
                                      {event.eventData.title.slice(0, 80)}
                                    </p>
                                    <p className={styles.desktop_view_para}>
                                      {" "}
                                      <HiLocationMarker
                                        className={styles.AiFillCalendarIcon}
                                      />{" "}
                                      18 Candleriggs, Glasgow City Centre G1 1LD
                                    </p>

                                    <p className={styles.AiFillCalendar}>
                                      <AiFillCalendar
                                        className={styles.AiFillCalendarIcon}
                                      />{" "}
                                      {dayjs(
                                        event.eventData.eventDate.slice(0, 10)
                                      ).format("MMMM D YYYY")}
                                    </p>
                                  </div>

                                  <div className={styles.event_row}>
                                    <p className={styles.event_rowShowTime}>
                                      <AiFillClockCircle
                                        className={styles.AiFillCalendarIcon}
                                      />{" "}
                                      {event.eventData.startTime}
                                    </p>
                                    <p
                                      className={`${styles[" mobile_view_para"]} ${styles["ticket_price_para"]} `}
                                    >
                                      <ImTicket className={styles.ticketIcon} />
                                      Tickets &#163;{event.eventData.price}
                                    </p>
                                    <p className={styles.button_item_para}>
                                      <a
                                        href={event.eventData.link}
                                        target={"_blank"}
                                        className={`${styles["button"]} ${styles["cart-btn"]}  ${styles["cart_btn_bottom"]}  ${styles["btn"]}`}
                                      >
                                        Book Tickets
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              <div className={styles.home_shadow} style={event.showEventDetails === true ? hideEventDetails.showDetails : hideEventDetails.dontShowDetails}></div>
                           </>
                           ))}

                            </div>
                            {mustSeeEvents.slice(2, 3).map((item, i) => (
                                <Link 
                                  href={`/event/${item.eventData.seoFriendlyURL}`}
                                >
                              <div className="event_img" key={""}>
                                  <Image
                                    alt="previews"
                                    src={item.desktopImage}
                                    className={`${styles["imageThird"]} ${styles["images-events"]}`}
                                  ></Image>
                              </div>
                                </Link>
                             ))} 
                          </div>
                        </div>
                      </div>
                    </div>
                   ) : (
                    ""
                  )} 
                </div>
              </div>
            </div>
            </div>
            </div>
            </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const activeEvents = await getActiveEvents();
  const banners = await getBanners();
  const mustSeeEvents = await getMustSeeEvents();

  //console.log(dataMustSeeEvents)
  //  only pass to the view valid must see events
  let validMustSeeEvents = [];
  if (mustSeeEvents) {
    if (mustSeeEvents.length > 0) {
      const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0));
      mustSeeEvents.every((item) => {
        if (
          item.desktopImage.length > 0 &&
          item.mobileImage.length > 0 &&
          item.order > 0 &&
          item.eventData.displayEventListingFrom.length == 10 &&
          new Date(item.eventData.eventDate).getTime() >=
            todayMidnight.getTime()
        ) {
          validMustSeeEvents.push(item);
        }

        //  3 are enough
        if (validMustSeeEvents.length == 3) {
          return false;
        }
        return true;
      });
    }
  }
  return {
    props: {
      events: JSON.stringify(activeEvents),
      banners: JSON.stringify(banners),
      mustSeeEvents: JSON.stringify(validMustSeeEvents),
    },
  };
}
