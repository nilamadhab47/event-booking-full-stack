import {IoIosMail} from "react-icons/io";
import {CgPhone} from "react-icons/cg";
import {HiLocationMarker} from "react-icons/hi";
import WhatsAppPop from "../component/WhatsAppPop";
import styles from "../styles/Contact.module.css";
import {ThreeDots} from "react-loader-spinner";
import dynamic from "next/dynamic";
import React, {Suspense, useState, useRef} from "react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import {useRouter} from "next/router";
import checkedCheck from "../Images/checkedCheck.png";
import style from "../styles/Venue.module.css";
import Image from "next/image";
import Footer from '../component/footer'
import {NextSeo} from "next-seo";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
    const router = useRouter();
    const recaptchaRef = React.createRef();
    const canonicalLink = process.env.NEXT_PUBLIC_URL + router.pathname;

    const data = {
        name: "",
        email: "",
        contactNumber: 0,
        additionalRequest: "",
    };

    const contactUsData = useRef(data);

    let popUp = useRef(null) // after submit popUp - Ref

    const handleChange = (e) => {
        contactUsData.current[e.target.id] = e.target.value;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Execute the reCAPTCHA when the form is submitted
        await recaptchaRef.current.execute();
    };

    const onReCAPTCHAChange = async (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        }

        //  submit the data to the API
        try {
            const response = await axios({
                method: "POST",
                url: "/api/contact-us/",
                data: JSON.stringify({
                    ...contactUsData.current,
                    captcha: captchaCode,
                    disableCaptcha: false,
                }),
                headers: {"Content-Type": "application/json"},
            });

            if (response) {
                popUp.current.style.display = "flex"
            }

        } catch (error) {
            toast.error(error, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });

            popUp.current.style.display = "none"
        }

        // Reset the reCAPTCHA so that it can be executed again if user
        // submits another email.
        recaptchaRef.current.reset();
    }

    const handleClose = () => {
        popUp.current.style.display = "none"
    }
    const Navbar = dynamic(() => import("../component/navbar"), {
        suspense: true,
    });

    return (
        <>
            <NextSeo
                title="Contact - 18 Candleriggs | Events Venue Glasgow"
                description="If it's your hen do, birthday bash or any other celebration - 18 Candleriggs is the ultimate nightspot to throw a unique bash. Contact us for details."
                canonical={canonicalLink}
            />
            <Suspense fallback={<div className="loading-lazy">loading....</div>}>
                <Navbar/>
            </Suspense>
            <div className={`${styles["contact-us"]}`}>
                <h1 className={`${styles["contact-us--heading"]}`}>Get In Touch</h1>
                <p className={`${styles["contact-us-para"]}`}>
                    We are always available to answer your questions, if its to book the
                    venue or to find out of there any tickets left for one of our events.
                </p>
            </div>
            <div className={`${styles["contact-us--left"]}`}>
                <a href="tel:+443302021818" className={styles.class_contact}>
          <span style={{fontSize: "25px"}}>
            <CgPhone className={styles.cgPhone}/>
          </span>
                    0330 202 1818
                </a>
                <a
                    href="mailto:events@18candleriggs.com"
                    className={styles.class_contact}
                >
          <span style={{fontSize: "25px"}}>
            <IoIosMail className={styles.IoIosMail}/>
          </span>
                    events@18candleriggs.com
                </a>
            </div>

            <div className="container" style={{borderTop: "2px solid #E9E9E9"}}>
                <div className={styles.contact_mobileView}>
                    <div className="row row-cols-md-2" id={styles.contact_mobileView}>
                        <div className="col">
                            <div className="contactLeft">
                                <div className={styles.contactHeadings}>
                                    <h3 className={styles.contactHeadingsh1}>Contact Us</h3>
                                    <p className={styles.contactHeadingsP}>
                                        Our Team would love to hear from you
                                    </p>
                                </div>
                                <form onSubmit={handleSubmit} onChange={handleChange}>

                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        size="invisible"
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                        onChange={onReCAPTCHAChange}
                                    />

                                    <div className={styles.contactFormStart}>
                                        <div className="mb-1 col-10">
                                            <label
                                                htmlFor="name"
                                                className={`${styles["form-label"]}`}
                                            >
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`${styles["form-control"]}`}
                                                id="name"
                                                placeholder="Enter Name"
                                            />
                                        </div>
                                        <div className="mb-1 col-10">
                                            <label
                                                htmlFor="email"
                                                className={`${styles["form-label"]}`}
                                            >
                                                Email Address{" "}
                                            </label>
                                            <input
                                                type="email"
                                                className={`${styles["form-control"]}`}
                                                id="email"
                                                placeholder="Enter company name"
                                            />
                                        </div>
                                        <div className="mb-1 col-10">
                                            <label
                                                htmlFor="contactNumber"
                                                className={`${styles["form-label"]}`}
                                            >
                                                Contact Number
                                            </label>
                                            <input
                                                type="text"
                                                className={`${styles["form-control"]}`}
                                                id="contactNumber"
                                                placeholder="Enter contact number"
                                                aria-label="City"
                                            />
                                        </div>

                                        <div className="mb-1 col-10">
                                            <label
                                                htmlFor="additionalRequest"
                                                className={`${styles["form-label"]}`}
                                            >
                                                Additional Request
                                            </label>
                                            <textarea
                                                id="additionalRequest"
                                                placeholder="Enter your request"
                                                className={styles.textareScroll}
                                            ></textarea>
                                        </div>

                                        <div
                                            className={styles.submitButton}
                                            style={{marginTop: "4rem"}}
                                        >
                                            <button className={styles.buttonSubmit} type="submit">
                                                Submit
                                            </button>
                                            {" "}
                                        </div>

                                        {/* <div
                    className={styles.submitButton}
                    style={{ marginTop: "4rem" }}
                  >
                    <button className={styles.buttonSubmit} type="submit">
                      Submit
                    </button>{" "}
                  </div> */}
                                    </div>
                                </form>
                                <div className={style.PosMessageContainer} id={styles.idPopMessageContainer}
                                     style={{display: "none"}} ref={popUp}>
                                    <div className={style.popContainer}>
                                        <div className={style.displayPopUp}>
                                            <Image src={checkedCheck} alt="tick"
                                                   className={style.checkedCheckImage}/>
                                            <div className={style.headingPopsChilds}>
                                                <h3>Thank you for submitting the form!</h3>
                                                <p>Our team will contact you shortly</p>
                                            </div>
                                            <div className={style.CloseButtonContainer}>
                                                <div className={style.PopClose}>
                                                    <button className={style.CloseButton} type="button"
                                                            onClick={handleClose}>Close
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className={`${styles["contact-us--right"]}`}>
                                <div className={styles.div_top}></div>
                                <p className={styles.contact_map}>
                                    <HiLocationMarker
                                        className={styles.map_logo}
                                        style={{height: "40px", width: "40px", marginTop: "-6px"}}
                                    />{" "}
                                    18 Candleriggs, Glasgow G1 1LD, UK
                                </p>

                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2239.2931340187865!2d-4.2481246840653855!3d55.8575803805815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488846a15d711dd1%3A0xfb23344156361e71!2s18%20Candleriggs%2C%20Glasgow%20G1%201LD%2C%20UK!5e0!3m2!1sen!2sin!4v1665748803540!5m2!1sen!2sin"
                                    className={styles.map_location}
                                    style={{border: "0", marginTop: "2.3rem"}}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>
            <WhatsAppPop/>
            <Footer/>

        </>
    );
}
