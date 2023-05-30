import styles from "../styles/Venue.module.css";
import FirstEventI from "../Images/FirstEventI.png";
import SecondEventI from "../Images/SecondEventI.png";
import ImageCornerNew3 from "../Images/ImageCornerNew3.png";
import ImageCornerNew4 from "../Images/ImageCornerNew4.png";
import FirstCollec from "../Images/FirstCollec.png";
import SecondCollec from "../Images/SecondCollec.png";
import ThirdCollec from "../Images/ThirdCollec.png";
import FourthCollec from "../Images/FourthCollec.png";
import FifthCollec from "../Images/FifthCollec.png";
import MainCarousel from "../component/mainCarasoul";
import Image from "next/image";
import WhatsAppPop from "../component/WhatsAppPop";
import dynamic from "next/dynamic";
import React, {Suspense, useRef} from "react";
import {ThreeDots} from "react-loader-spinner";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import checkedCheck from "../Images/checkedCheck.png";
import {NextSeo} from "next-seo";
import Footer from "../component/footer";
import ReCAPTCHA from "react-google-recaptcha";
import {useRouter} from "next/router";

export default function BookVenue() {
    const router = useRouter();
    const recaptchaRef = React.createRef();
    const canonicalLink = process.env.NEXT_PUBLIC_URL + router.pathname;

    const data = {
        name: "",
        email: "",
        contactNumber: "",
        numberOfGuests: 0,
        occasion: "",
        occasionOtherDescription: "",
        preferredDate: "",
        requireFood: "",
        foodLookingFor: "",
        whatTypeOfFoodPreferred: "",
        dietaryOrAllergiesRequirements: "",
        dietaryOrAllergiesRequirementsDescription: "",
        drinksServed: "",
        drinksOnArrival: "",
        entertainmentProvidedByUs: "",
        whatTypeOfEntertainmentProvidedByUs: "",
        externalCompaniesToDecorate: "",
        alcoholPackages: "",
    };

    let contactData = useRef(data);
    let toggleOtherOccasion = useRef(null); // Other Description Textarea
    let foodType = useRef(null); //  Type Of food Type
    let foodPreferred = useRef(null); //  Type Of food Preferred
    let allergiesRequirementsDescrition = useRef(null); // allergies Requirements Descrition BOx
    let typeOfEntertainment = useRef(null); // type Of Entertainment
    let popUp = useRef(null); // after submit popUp
    let othersBox = useRef(null);

    const handleChange = (e) => {
        contactData.current[e.target.id] = e.target.value;
        if (e.target.value === "Others") {
            toggleOtherOccasion.current.style.display = "block";
        }

        if (e.target.value === "Yes-Food") {
            foodType.current.style.display = "flex";
            foodPreferred.current.style.display = "block";
        }

        if (e.target.value === "Yes-Allergies") {
            allergiesRequirementsDescrition.current.style.display = "flex";
        }

        if (e.target.value === "Yes-Entertainment") {
            typeOfEntertainment.current.style.display = "block";
        }
        if (e.target.value === "on") {
            (othersBox.current.type = "text"),
                (othersBox.current.style.textTransform = "capitalize");
        }

        console.log(contactData);
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

        try {
            const response = await axios({
                method: "POST",
                url: `/api/book-venue`,
                data: JSON.stringify({
                    ...contactData.current,
                    captcha: captchaCode,
                    disableCaptcha: false,
                }),
                headers: {"Content-Type": "application/json"},
            });

            if (response) {
                popUp.current.style.display = "flex";
            }

        } catch (error) {
            // setisButtonDisabled(false);
            popUp.current.style.display = "none";
            console.log(error);
        }

        // Reset the reCAPTCHA so that it can be executed again if user
        // submits another email.
        recaptchaRef.current.reset();
    }

    const handlePopUpClose = () => {
        popUp.current.style.display = "none";
    };
    const Navbar = dynamic(() => import("../component/navbar"), {
        suspense: true,
    });

    return (
        <>
            <NextSeo
                title="Book the most fun venue in Glasgow - 18 Candleriggs"
                description="Whether you're looking for a traditional celebration or a more quirky experience, 18 Candleriggs is the perfect events venue in town. Book your event."
                canonical={canonicalLink}
            />
            <Suspense fallback={<div className="loading-lazy">loading....</div>}>
                <Navbar/>
            </Suspense>
            <div className={styles.venuesStarting}>
                <div
                    className={styles.main_top_venue_head}
                    style={{
                        textAlign: "center",
                        alignItems: "center",
                        display: "contents",
                        fontFamily: "Rochester",
                    }}
                >
                    <h1 className={styles.cardevent1}>
                        At 18 Candleriggs we make it happen
                    </h1>
                </div>
                <div
                    className={`${styles["event_rowStart"]} ${styles["event_main_section"]} ${styles["ro"]} ${styles["ro-cols-md-2"]} ${styles["container"]} ${styles["ro-cols-1"]} ${styles["g-4"]}`}
                    style={{marginTop: "1rem"}}
                >
                    <div
                        className={`${styles["event_Col1"]} ${styles["col"]} ${styles["container"]}`}
                    >
                        <Image src={FirstEventI} className="card-img-top" alt="..."/>
                        <div
                            className={`${styles["card-body"]} ${styles["card-items"]} ${styles["card_heading"]}`}
                        >
                            <h5
                                className={`${styles["card-title"]} ${styles["sideImageheading"]} ${styles["venue_heading"]} ${styles["cardEight"]}`}
                                style={{
                                    marginTop: "75px",
                                    width: "491px",
                                    marginLeft: "35px",
                                }}
                            ></h5>
                        </div>
                    </div>

                    <div
                        className={`${styles["event_Col2"]} ${styles["col"]} ${styles["container"]}`}
                    >
                        <div
                            className={`${styles["card-body"]} ${styles["card-position"]} ${styles["card_heading"]}`}
                        >
                            <h5 className={`${styles["cardEvent"]} ${styles["card-title"]}`}>
                                Events are the name of the game{" "}
                            </h5>
                        </div>
                        <Image src={SecondEventI} className="card-img-top" alt="..."/>
                    </div>
                </div>

                <div className={styles.Book_Venue_container}>
                    <h5>Book Venue</h5>
                    <div className="Book_carasouel container">
                        <MainCarousel/>
                    </div>
                    <div className={styles.Book_Venue_description}></div>
                </div>
            </div>
            <div className={styles.sectionParaAndImages}>
                <section className={styles.section_main_container}>
                    <div className={styles.section_main_left}>
            <span className={styles.span_image}>
              <Image src={ImageCornerNew3} alt=""/>
            </span>
                        <div className={styles.top_image}>
                            <Image src={FirstCollec} alt=""/>
                            <Image src={SecondCollec} alt=""/>
                        </div>
                        <div className={styles.horizontal_image}>
                            <Image src={ThirdCollec} alt=""/>
                            <Image src={FourthCollec} alt=""/>
                        </div>
                        <div className={styles.main_horizontal_img}>
                            <Image src={FifthCollec} alt=""/>
                        </div>
                        <Image
                            src={ImageCornerNew4}
                            className={styles.corner_left}
                            alt=""
                        />
                    </div>
                </section>
                <div
                    className={`${styles["right_section"]} ${styles["rigthSectionDesktopView"]}`}
                >
                    <div className={styles.para_section}>
                        <p>
                            A one-stop cabaret lounge in the heart of Merchant City, 18
                            Candleriggs (formerly known as Wild Cabaret) knows no bounds when
                            it comes to unique dabbles, daring nights and dashing shows.
                        </p>
                        <p>
                            Echoing its eccentric entertainment, the decor is markedly Art
                            Deco. Gilded in gold, with a bar boasting its name up in
                            Hollywood-style lights, these two spaces epitomize showbiz and
                            glistening sass. Sashay down to a table of baroque seats and let
                            the show commence.
                        </p>
                        <p>
                            Events are the name of the game at 18 Candleriggs, where live
                            music and cabaret reign supreme. From burlesque shows and circus
                            troupes to comedy nights and luxe shows, it&apos;s at the top of
                            its game when it comes to providing guests with a wholly unique
                            drinking and dining experience in the city. Top hats? Sparkles?
                            And feather boas? These all come as standard.
                        </p>
                    </div>
                </div>
                <div
                    className={`${styles["right_section"]} ${styles["rigthSectionMobileView"]}`}
                >
                    <div
                        className={`${styles["para_section"]} ${styles["paraSectionMobileView"]}`}
                    >
                        <p className={styles.paraSectionP} style={{color: "#000000"}}>
                            Events are the name of the game at 18 Candleriggs, where live
                            music and cabaret reign supreme. From burlesque shows and circus
                            troupes to comedy nights and luxe shows, it&apos;s at the top of
                            its game when it comes to providing guests with a wholly unique
                            drinking and dining experience in the city. Top hats? Sparkles?
                            And feather boas? These all come as standard.
                        </p>
                        <p
                            style={{color: "#000000", fontWeight: "bold", fontSize: "13px"}}
                        >
                            18 Candleriggs the perfect venue to host your next event.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className={styles.contactForm}>
                    <div className={styles.contactHeadings}>
                        <h5 className={styles.contactHeadingsh1}>Contact Us</h5>
                        <p className={styles.contactHeadingsP}>
                            Our Team would love to hear from you
                        </p>
                    </div>
                    <form className="row" onSubmit={handleSubmit}>

                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={onReCAPTCHAChange}
                        />

                        <div className={styles.row}>
                            <div className="col-4">
                                <label htmlFor="name" className={`${styles["form-label"]}`}>
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    className={`${styles["form-control"]}`}
                                    placeholder="Enter name"
                                    id="name"
                                    aria-label="First name"
                                    defaultValue={data.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor="email" className={`${styles["form-label"]}`}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className={`${styles["form-control"]}`}
                                    placeholder="Enter Email Address"
                                    id="email"
                                    defaultValue={data.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className="col-3">
                                <label
                                    htmlFor="contactNumber"
                                    className={`${styles["form-label"]}`}
                                >
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    className={`${styles["form-control"]} ${styles["form-controlThird"]}`}
                                    id="contactNumber"
                                    placeholder="Enter contact number"
                                    aria-label="City"
                                    defaultValue={data.contactNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-2">
                                <label
                                    htmlFor="numberOfGuests"
                                    className={`${styles["form-label"]}`}
                                >
                                    Number of Guests
                                </label>
                                <input
                                    type="text"
                                    className={`${styles["form-control"]} ${styles["form-controlfourth"]}`}
                                    id="numberOfGuests"
                                    placeholder="Enter"
                                    aria-label="State"
                                    defaultValue={data.numberOfGuests}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="occasion" className={`${styles["form-label"]}`}>
                                    Occasion
                                </label>
                                <select
                                    id="occasion"
                                    className={`${styles["form-control"]} ${styles["form-controlThird"]}`}
                                    onChange={handleChange}
                                >
                                    <option selected>Select</option>
                                    <option value="Birthday">Birthday</option>
                                    <option value="Naming dayChristening">
                                        Naming dayChristening
                                    </option>
                                    <option value="Kids Birthday">Kids Birthday</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Charity">Charity</option>
                                    <option value="Funeral">Funeral</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Christmas">Christmas</option>
                                    <option value="General">General</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div
                                className="col-8"
                                ref={toggleOtherOccasion}
                                style={{display: "none"}}
                            >
                                <label
                                    htmlFor="occasionOtherDescription"
                                    className={`${styles["form-label"]}`}
                                >
                                    Others
                                </label>
                                <textarea
                                    id="occasionOtherDescription"
                                    placeholder="Type here"
                                    rows="7"
                                    cols="13"
                                    className={styles.textareScroll}
                                    defaultValue={data.occasionOtherDescription}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className="col-4">
                <span className={styles.labelSpan}>
                  {" "}
                    <label
                        htmlFor="preferredDate"
                        className={`${styles["form-label"]}`}
                    >
                    Preferred Date
                  </label>{" "}
                    <span className={styles.spanCheckbox}><input
                        type="checkbox"
                        onChange={handleChange}
                        id="preferredDateOtherNotes"
                        class={styles.checkboxRound}
                    /> </span>
                    &nbsp;
                    <label
                        htmlFor="preferredDateOtherNotes"
                        className={`${styles["form-label"]}`}
                    >
                    Others
                  </label>
                </span>
                                <input
                                    type="date"
                                    ref={othersBox}
                                    className={`${styles["form-control-text"]}`}
                                    id="preferredDate"
                                    aria-label="First name"
                                    placeholder="Type Here"
                                    defaultValue={data.preferredDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-4">
                                <label
                                    htmlFor="requireFood"
                                    className={`${styles["form-label"]}`}
                                >
                                    Would you require food?
                                </label>
                                <select
                                    id="requireFood"
                                    className={`${styles["form-controlSelect"]} ${styles["form-controlSecond"]}`}
                                    onChange={handleChange}
                                >
                                    <option selected>Select</option>
                                    <option value="Yes-Food">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className="col-8"></div>
                        </div>
                        <div
                            className={styles.row}
                            ref={foodType}
                            style={{display: "none"}}
                        >
                            <div className="col-4">
                                <label
                                    htmlFor="foodLookingFor"
                                    className={`${styles["form-label"]}`}
                                >
                                    If ‘Yes’, what food are you looking for?
                                </label>
                                <select
                                    id="foodLookingFor"
                                    className={`${styles["form-controlSelect"]} ${styles["form-controlSecond"]}`}
                                    onChange={handleChange}
                                >
                                    <option selected>Select</option>
                                    <option value="Table Service">Table Service</option>
                                    <option value="Buffet Style">Buffet Style</option>
                                </select>
                            </div>
                            <div
                                className="col-4"
                                ref={foodPreferred}
                                style={{display: "none"}}
                            >
                                <label
                                    htmlFor="whatTypeOfFoodPreferred"
                                    className={`${styles["form-label"]}`}
                                >
                                    What type of food is preferred?
                                </label>
                                <select
                                    id="whatTypeOfFoodPreferred"
                                    className={`${styles["form-controlSelect"]} ${styles["form-controlSecond"]}`}
                                    onChange={handleChange}
                                >
                                    <option selected>Select</option>
                                    <option value="'Finger food' buffet">
                                        'Finger food' buffet
                                    </option>
                                    <option value="Traditional Buffet">Traditional Buffet</option>
                                    <option value="Set menu (chosen between customer and our head chef)">
                                        Set menu (chosen between customer and our head chef)
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className="col-8">
                                <label
                                    htmlFor="dietaryOrAllergiesRequirements"
                                    className={`${styles["form-label"]}`}
                                >
                                    Do you have any dietary requirements and/or allergies in your
                                    party?
                                </label>
                                <select
                                    id="dietaryOrAllergiesRequirements"
                                    className={`${styles["form-controlSelect"]}`}
                                    onChange={handleChange}
                                >
                                    <option selected>Select</option>
                                    <option value="Yes-Allergies">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div
                            className={styles.row}
                            style={{display: "none"}}
                            ref={allergiesRequirementsDescrition}
                        >
                            <div className="col-8">
                                <label
                                    htmlFor="dietaryOrAllergiesRequirementsDescription"
                                    className={`${styles["form-label"]}`}
                                >
                                    if yes, please add clearly in notes
                                </label>
                                <textarea
                                    id="dietaryOrAllergiesRequirementsDescription"
                                    placeholder="Type here"
                                    rows="7"
                                    cols="13"
                                    defaultValue={data.dietaryOrAllergiesRequirementsDescription}
                                    className={styles.textareScroll}
                                ></textarea>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className="col-4">
                                <label
                                    htmlFor="drinksServed"
                                    className={`${styles["form-label"]}`}
                                >
                                    How would you like drinks served?
                                </label>
                                <select
                                    id="drinksServed"
                                    className={`${styles["form-controlSelect"]} ${styles["form-controlSecond"]}`}
                                    onChange={handleChange}
                                >
                                    <option selected>Select</option>
                                    <option value="Table Service">Table Service</option>
                                    <option value="Bar Service">Bar Service</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <label
                                    htmlFor="drinksOnArrival"
                                    className={`${styles["form-label"]}`}
                                >
                                    Drink on arrival?
                                </label>
                                <select
                                    id="drinksOnArrival"
                                    className={`${styles["form-controlSelect"]} ${styles["form-controlSecond"]}`}
                                    onChange={handleChange}
                                >
                                    <option selected>Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div
                                className="col-8"
                                style={{display: "none"}}
                                ref={typeOfEntertainment}
                            >
                                <label
                                    htmlFor="whatTypeOfEntertainmentProvidedByUs"
                                    className={`${styles["form-label"]}`}
                                >
                                    If ‘Yes’, what are you looking for?
                                </label>
                                <select
                                    id="whatTypeOfEntertainmentProvidedByUs"
                                    className={`${styles["form-controlSelect"]}`}
                                    onChange={handleChange}
                                >
                                    <option selected>Select</option>
                                    <option value="Singer">Singer</option>
                                    <option value="Band">Band</option>
                                    <option value="DJ">DJ</option>
                                    <option value="Comedian">Comedian</option>
                                    <option value="Kids Entertainer">Kids Entertainer</option>
                                    <option value="Magician">Magician</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="col-8">
                                <label
                                    htmlFor="entertainmentProvidedByUs"
                                    className={`${styles["form-label"]}`}
                                >
                                    Are you looking for entertainment to be provided by us?
                                </label>
                                <select
                                    id="entertainmentProvidedByUs"
                                    className={`${styles["form-controlSelect"]}`}
                                    onChange={handleChange}
                                >
                                    <option selected>Select</option>
                                    <option value="Yes-Entertainment">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="col-8">
                                <label
                                    htmlFor="externalCompaniesToDecorate"
                                    className={`${styles["form-label"]}`}
                                >
                                    Are you looking to bring in external companies to decorate?
                                </label>
                                <select
                                    id="externalCompaniesToDecorate"
                                    className={`${styles["form-controlSelect"]}`}
                                    onChange={handleChange}
                                >
                                    <option selected>Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="col-8">
                                <label
                                    htmlFor="alcoholPackages"
                                    className={`${styles["form-label"]}`}
                                >
                                    Are you looking for alcohol packages?
                                </label>
                                <select
                                    id="alcoholPackages"
                                    className={`${styles["form-controlSelect"]}`}
                                    onChange={handleChange}
                                >
                                    <option selected>Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.submitButton} style={{marginTop: "4rem"}}>
                            <button className={styles.buttonSubmit} type="submit">
                                Submit
                            </button>
                            {" "}
                        </div>

                        <div
                            className={styles.PosMessageContainer}
                            style={{display: "none"}}
                            ref={popUp}
                        >
                            <div className={styles.popContainer}>
                                <div className={styles.displayPopUp}>
                                    <Image
                                        src={checkedCheck}
                                        alt="tick"
                                        className={styles.checkedCheckImage}
                                    />
                                    <div className={styles.headingPopsChilds}>
                                        <h3>Thank you for submitting the form!</h3>
                                        <p>Our team will contact you shortly</p>
                                    </div>
                                    <div className={styles.CloseButtonContainer}>
                                        <div className={styles.PopClose}>
                                            <button
                                                type="button"
                                                className={styles.CloseButton}
                                                onClick={handlePopUpClose}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <ToastContainer/>
            </div>
            <div className="whatsapp" style={{position: "relative"}}>
                <WhatsAppPop/>
            </div>
            <Footer/>
        </>
    );
}
