import { NextSeo } from "next-seo";
import React, { Suspense, useState } from "react";
import styles from "../../styles/faq.module.css";
import Footer from "../../component/footer";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import faqData from "../../component/FaqData";
import Accordion from "../../component/Accordian";
import Head from "next/head";
import Link from "next/link";

export default function FAQ() {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const canonicalLink = process.env.NEXT_PUBLIC_URL + router.pathname;

  const Navbar = dynamic(() => import("../../component/navbar"), {
    suspense: true,
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When do reservations open?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book your table 2 months prior to an event up until 1 hour before it starts, depending on availability. To book the venue please give us a call on 0330 202 1818",
        },
      },
      {
        "@type": "Question",
        name: "How can I amend my booking?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you already have a booking with us, you can amend or cancel your booking via your confirmation email or text message. If you still need assistance, please give us a call on 0330 202 1818 and a member of our team will be able to help you.",
        },
      },
      {
        "@type": "Question",
        name: "What is your cancellation policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "48 hours",
        },
      },
      {
        "@type": "Question",
        name: "Booking Policies",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book a table 2 months in advance via our website which shows our live availability. If you need further assistance, our reservation lines are open 9 am to 5 pm daily.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a service charge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There is a £10 deposit p/p which is non-returnable if cancellations are made after policy requirements.",
        },
      },
      {
        "@type": "Question",
        name: "What payment is required for reservations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "£10 deposit p/p required",
        },
      },
      {
        "@type": "Question",
        name: "Waiting List & Walk-Ins",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We do not currently operate a waiting list, but you can see live, up-to-date availability on our website. Our restaurant will do its best to accommodate walk-ins, but we cannot guarantee availability during busy periods. Any cancelled tables are immediately available online; we recommend that guests periodically check online availability as our online system is live and accurate",
        },
      },
      {
        "@type": "Question",
        name: "Family Policy",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We welcome children & babies of all ages subject to the performance recommended age limit. When you’re booking your table, please make sure all children in your group (even the babies) are included in your total number of guests. And if you need a highchair or extra space for a pushchair. Just let us know when you book, and we’ll take care of everything.",
        },
      },
      {
        "@type": "Question",
        name: "Menus & Dietary Requirements",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you or a member of your group has an allergy, intolerance, or any other special dietary requirements, just let us know when you book, and our team will be ready to accommodate you on the day. We also have allergen charts available on our menu.",
        },
      },
      {
        "@type": "Question",
        name: "What is your menu offering?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can check our 18 Candleriggs menu online.",
        },
      },
      {
        "@type": "Question",
        name: "Cakes, Celebrations & Decorations",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To ensure the 18 Candleriggs experience is enjoyable for all guests in our venue, we do not allow party decorations or balloons. However, if you’d like to have a celebration cake, we’d be happy to help. Just let us know at least 48 hours before your booking and we’ll talk you through the available options. You are, of course, more than welcome to bring your own celebration cake with you. Due to health and safety regulations, we won’t be able to serve it to you, but we can present it at your table after your meal and keep it aside for you to take with you when you leave.",
        },
      },
      {
        "@type": "Question",
        name: "What is your maximum table capacity?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our tables can accommodate 50 persons, while the entire venue can accommodate around 400 guests.",
        },
      },
      {
        "@type": "Question",
        name: "Dress Code",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our dress code is smart-casual and quite relaxed. We just ask that the general look does not appear too sporty i.e. tracksuits/football shirts/baseball caps. Smart trainers are allowed.",
        },
      },
      {
        "@type": "Question",
        name: "Is the restaurant wheelchair accessible?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "YES",
        },
      },
      {
        "@type": "Question",
        name: "Dog Policy",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Guide dogs and certified emotional support dogs are allowed in our venue. We do not allow dogs or any other pets inside our restaurant.",
        },
      },
      {
        "@type": "Question",
        name: "Parking",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our nearest parking is Q-Park Candleriggs - 37 Albion St, Glasgow G1 1LH, United Kingdom (2 minutes walk from the restaurant).",
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <script
            key="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
      </Head>
      <NextSeo
        title="FAQ - 18 Candleriggs | Events Venue Glasgow"
        description="Find out answers to the frequently asked questions about 18 Candleriggs, the top-rated events venue in Glasgow's Merchant City."
        canonical={canonicalLink}
      />
      <Suspense fallback={<div className="loading-lazy">loading....</div>}>
        <Navbar />
      </Suspense>
      <div className={styles.faq_div}>
        <div className={styles.faq_container}>
          <div className={styles.faq_section_one}>
            <h1>Frequently Asked Questions</h1>
          </div>

          <div className={styles.faq_section_four}>
            <div className={styles.faq_section_div}>
              <div className={styles.faq_section_item}>
                <div
                  className={styles.accordian_question_div}
                  style={{ display: "flex" }}
                  onClick={() => setIsActive(!isActive)}
                >
                  <span>What are your opening hours?</span>
                  <div>{isActive ? "-" : "+"}</div>
                </div>
                <br />
                {isActive && (
                  <div>
                    <b>Brunch Lunch: Wednesday</b> – Sunday 9:00am – 4:00 pm <br/><b>Venue
                    Opening Times:</b> <br/> Sunday – Thursday : 11:00am – 12:00am<br/> 
                    Friday & Saturday : 11:00am – 03:00am <br/><b>Dinner:</b><br/> Sunday -
                    Thursday 18:00pm - midnight (last reservations 8.00pm) <br/>
                    Friday & Saturday 18:00pm - midnight (last reservations
                    8:00pm)
                  </div>
                )}
              </div>
              {faqData.map((fdata, i) => (
                <Accordion question={fdata.question} answer={fdata.answer} />
              ))}
            </div>
            <p className={styles.faq_p}>Do you still have a question? <a href="tel:+443302021818">Please give us a call</a> or fill in our <Link href={"/contact"}>online form</Link>.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
