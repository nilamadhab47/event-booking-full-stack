import {ImTicket} from "react-icons/im";
import {AiFillClockCircle, AiFillCalendar} from "react-icons/ai";
import {MdPerson} from "react-icons/md";
import dynamic from "next/dynamic";
import React, {Suspense} from "react";
import styles from "../../styles/Eventpage.module.css";
import Image from "next/image";
import dayjs from "dayjs";
import soldOut from "../../Images/soldOut.png";
import cancelled from "../../Images/cancelled.png";
import {Roboto} from "@next/font/google";
import {NextSeo} from "next-seo";
import Footer from '../../component/footer'
import getActiveEvents from "../../services/activeEvents";
import eventFriendlyUrl from "../../services/eventFriendlyUrl";
import Head from "next/head";

const Navbar = dynamic(() => import("../../component/navbar"), {
    ssr: false,
});
const roboto = Roboto({subsets: ["latin"], weight: "400"});
export default function EventPage(props) {
    const canonicalLink = process.env.NEXT_PUBLIC_URL + "/event/" + props.seoFriendlyURL;
    const event = JSON.parse(props.event)

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.name,
        startDate: event.eventDate,
        endDate: event.eventDate,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
            "@type": "Place",
            name: "18 Candleriggs",
            address: {
                "@type": "PostalAddress",
                streetAddress: "18 Candleriggs",
                addressLocality: "Glasgow",
                postalCode: "G1 1LD",
                addressRegion: "Glasgow, City Of",
                addressCountry: "UK"
            }
        },
        image: [
            event.desktopImage,
        ],
        description: event.shortDescription,
        offers: {
            "@type": "Offer",
            url: event.link,
            price: event.price,
            priceCurrency: "GBP",
            availability: "https://schema.org/InStock",
            validFrom: event.displayEventListingFrom
        },
        performer: {
            "@type": "PerformingGroup",
            name: event.performer,
        },
        organizer: {
            "@type": "Organization",
            name: event.organizer,
            url: event.organizerUrl,
        }
    };

    return (
        <>
            <Head>
                <script
                    key="structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>
            <NextSeo
                title={event.seoTitle}
                description={event.seoDescription}
                canonical={canonicalLink}
            />
            <Suspense fallback={<div className="loading-lazy">loading....</div>}>
                <Navbar/>
            </Suspense>
            <div className={`${"exceedContainers"} ${roboto.className}`}>
                <div className="fullEvent">
                    <div className={styles.event_page}>
            <span className={styles.event} style={{position: "absolute"}}>
              {event.eventType === "Sold Out" ? (
                  <Image src={soldOut} className={styles.eventcancelled1}/>
              ) : event.eventType === "Cancelled" ? (
                  <Image src={cancelled} className={styles.eventcancelled1}/>
              ) : null}
            </span>
                        <Image
                            width={333}
                            height={450}
                            src={
                                !event.desktopImage
                                    ? "https://dummyimage.com/335x450/000000/ffffff.png&text=NO+IMAGE++(size+:+335+x+450)"
                                    : event.desktopImage
                            }
                            className={styles.event_page_img}
                            alt="eventData-desktopImage"
                        />
                        <div className={`${styles["card-body1"]}`}>
                            <h1 className={`${styles["card-title1"]}`}>{event.name}</h1>
                            <p className={`${styles["card-text1"]}`}>{event.title}</p>
                            <p className={`${styles["card-text2"]}`}>
                                {event.shortDescription}
                            </p>
                            <div className={`${styles["event_page_rowDesktop"]} ${styles["event_page_row"]}`}>
                                <p className="card-text card_gap">
                                    <AiFillCalendar style={{marginTop: "-3px"}}/>
                                    &nbsp;
                                    {dayjs(event.eventDate).format("MMM D YYYY")}
                                </p>
                                {event.price != 0 ? (
                                    <p className={`${styles["card_gap"]} ${styles["card-text"]}`}>
                                        {""}
                                        <ImTicket style={{marginTop: "-3px"}}/> Ticket &#163;
                                        {event.price} + BF &#163;{event.bookingFee}
                                    </p>
                                ) : (
                                    <p className={`${styles["card_gap"]} ${styles["card-text"]}`}>
                                        {""}
                                        <ImTicket style={{marginTop: "-3px"}}/> Free Event
                                    </p>
                                )}
                                {event.age === "18+" || event.age === "All Ages" ? (
                                    <p className={styles.CardTextAge1}>
                                        <MdPerson style={{marginTop: "-3px"}}/>
                                        &nbsp;Age:&nbsp;{event.age}
                                    </p>
                                ) : (
                                    <></>
                                )}
                                <p
                                    className={`${styles["card_gap"]} ${styles[" card_gap1"]} ${styles["text-2-b"]} ${styles["card-text"]} `}
                                >
                                    <AiFillClockCircle style={{marginTop: "-1px"}}/> Start{" "}
                                    {event.startTime}
                                    {""} | Doors {event.doorOpeningTime}
                                </p>
                            </div>
                            <div className={`${styles["event_page_rowMobile"]} ${styles["event_page_row"]}`}>


                                <div className={styles.eventflexticket}>

                                    {event.price != 0 ? (
                                        <p className={`${styles["card_gap"]} ${styles["card-text"]}`}>
                                            {""}
                                            <ImTicket style={{marginTop: "-3px"}}/> Ticket &#163;
                                            {event.price} + BF &#163;{event.bookingFee}
                                        </p>
                                    ) : (
                                        <p className={`${styles["card_gap"]} ${styles["card-text"]}`}>
                                            {""}
                                            <ImTicket style={{marginTop: "-3px"}}/> Free Event
                                        </p>
                                    )}
                                    {event.age === "18+" || event.age === "All Ages" ? (
                                        <p className={styles.CardTextAge1}>
                                            <MdPerson style={{marginTop: "-3px"}}/>
                                            &nbsp;Age:&nbsp;{event.age}
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className={styles.eventflexcalender}>


                                    <p>
                                        <AiFillCalendar style={{marginTop: "-3px"}}/>
                                        &nbsp;
                                        {dayjs(event.eventDate).format("MMM D YYYY")}
                                    </p>
                                    <p
                                        className={`${styles["card_gap"]} ${styles[" card_gap1"]} ${styles["text-2-b"]} ${styles["card-text"]} `}
                                    >
                                        <AiFillClockCircle style={{marginTop: "-1px"}}/> Start{" "}
                                        {event.startTime}
                                        {""} | Doors {event.doorOpeningTime}
                                    </p>
                                </div>
                            </div>
                            {event.eventType === "Live" ? (
                                <a href={event.link} target={"_blank"}>
                                    <button className={styles.event_page_btn2}>
                                        Book Tickets
                                    </button>
                                </a>
                            ) : event.eventType === "Private Booking" ? (
                                <button
                                    className={styles.event_page_btn2}
                                    style={{
                                        background: "#FFFFFF",
                                        color: "#000000",
                                        cursor: "not-allowed",
                                    }} id={styles.privateBookingButton}
                                >
                                    Private Booking
                                </button>
                            ) : event.eventType === "Sold Out" ? (
                                <button
                                    className={styles.event_page_btn2}
                                    style={{
                                        background: "#D01010",
                                        color: "#FFFFFF",
                                        cursor: "not-allowed",
                                    }}
                                >
                                    Sold Out
                                </button>
                            ) : event.eventType === "Cancelled" ? (
                                <button
                                    className={styles.event_page_btn2}
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
                </div>
            </div>
            <Footer/>
        </>
    );
}

// Generates `/events/private-event-2023-01-20` and `/events/wild-cabaret-2023-01-25`
export async function getStaticPaths() {
    const activeEvents = await getActiveEvents()

    let paths = [];
    activeEvents.forEach((item) => {
        if (item.seoFriendlyURL.length > 0) {
            paths.push({
                params: {
                    seoFriendlyURL: item.seoFriendlyURL,
                },
            });
        }
    });

    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
    const {seoFriendlyURL} = context.params;
    const event = await eventFriendlyUrl(seoFriendlyURL)
console.log(event)
    return {
        props: {
            event: JSON.stringify(event),
            seoFriendlyURL: seoFriendlyURL,
        },
        revalidate: 10, // In seconds
    };
}
