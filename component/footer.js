import React from "react";
import {useState} from "react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Footer.module.css";
import {IoIosMail} from "react-icons/io"
import {BsFillTelephoneFill, BsFacebook, BsInstagram, BsWindowSidebar} from "react-icons/bs";
import dayjs from "dayjs"
import Image from "next/image";
import Link from "next/link";
import logo_196x196 from "../Images/logo_196x196.png"

const Footer = () => {
    // const [display, setDisplay] = useState(false);

    const [subscriber, setSubscriber] = useState({
        email: "",
        display: false,
    });


    const handleChange = (e) => {
        setSubscriber({...subscriber, [e.target.id]: e.target.value});
    };
    console.log(subscriber)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (subscriber.email === "") {
            return toast.error("Email is mandatory", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }

        const formData = new FormData();
        formData.append("email", subscriber.email);
        formData.append("date", new dayjs().format('YYYY-MM-DD'));
        console.log(formData)
        try {
            const response = await axios({
                method: "post",
                url: "/api/subscriber",
                data: formData,
                headers: {"Content-Type": "application/json"},
            });
            console.log(response);
            // if(data.Email===""){
            //   window.alert("error")
            // }

            setSubscriber({
                email: subscriber.email,
                display: true,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div
                id="Contact-us"
                className={styles.footer}
                style={{background: "#270F33", "fontFamily": "Roboto"}}
            >
                <div className={styles.contactDiv}>
                    <div className={styles.contactContainer}>
                        <div className={styles.contactLinks}>
                          <span className={styles.contactLinksSpan}>
                            <Link href={"/terms-and-conditions"}>Terms & Conditions</Link>
                            <Link href={"/privacy-policy"}>Privacy Policy</Link>
                            <Link href={"/faq"}>FAQ</Link>
                          </span>
                        </div>
                    </div>
                    <div className={styles.email}>
                        <div className={styles.email_box}>
                            <h5>Get Event Updates</h5>
                            <div className={styles.form_box}>
                                {subscriber.display === false ? (
                                    <form className={styles.footer_form} onSubmit={handleSubmit}
                                          onChange={handleChange}>
                                        <input
                                            placeholder="Enter email address"
                                            type="email"
                                            id="email"
                                        />
                                        <button type="submit" className={styles.search_footer}>
                                            Submit
                                        </button>
                                    </form>
                                ) : (
                                    <p className={styles.display_email}>
                                        Thank you for inquiring, you will get the Event updates on{" "}
                                        {subscriber.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={styles.contactPrivacyDivs}>

                            <div
                                className={styles.contact}

                            >
                                <h4>Contact Us</h4>
                                <div className={styles.class_left}>

                                    <a
                                        href="mailto:events@18candleriggs.com"
                                        style={{textDecoration: "none", color: "white"}}
                                        className={styles.contact_links}
                                    >
                                        {" "}
                                        <span style={{
                                            fontSize: "23px"
                                            , "position": "relative", "top": "0px"
                                        }}>
                                          <IoIosMail/>

                                        </span>{" "}
                                        events@18candleriggs.com
                                    </a>
                                    <a
                                        href="tel:+443302021818"
                                        style={{textDecoration: "none", color: "white", marginTop:"0.5rem"}}
                                        className={styles.contact_links} id={styles.contactLinksDial}
                                    >
                  
                                      <span style={{fontSize: "20px", "position": "relative", "top": "0px"}}>
                                      <BsFillTelephoneFill/>{" "}
                                      </span>
                                        0330 202 1818
                                    </a>
                                </div>

                            </div>
                            <div className={styles.contactPrivacy}>
                                <h4>Social Links</h4>
                                <div
                                    className={styles.footet_social}

                                >
                                    <a
                                        href="https://www.facebook.com/18Candleriggs/"
                                        style={{
                                            paddingRight: "10px",
                                            color: "white",
                                            paddingTop: "1rem",
                                        }}
                                    >

                                    </a>
                                    <a
                                        href="https://www.instagram.com/18candleriggs/"
                                        style={{color: "white"}}
                                    >

                                    </a>
                                    <div className="footet--social" style={{marginTop: "-18px"}}>
                                        <a
                                            href="https://www.facebook.com/18Candleriggs/"
                                            style={{
                                                paddingRight: "10px",
                                                color: "white",
                                                paddingTop: "1rem",
                                            }}
                                        >
                                            <BsFacebook size={22}/>
                                        </a>
                                        <a
                                            href="https://www.instagram.com/18candleriggs/"
                                            style={{color: "white"}}
                                        >
                                            <BsInstagram size={22}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contactEndLink}>
                        <p>© 18 candleriggs 2022</p>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default Footer;
