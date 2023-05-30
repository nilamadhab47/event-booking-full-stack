import styles from "../../../styles/AddBanner.module.css";
import Dashboard from "../dashboard";
import Image from "next/image";
import dashboardImage from "../admin-images/dashboard-image.png";
import Placeholder333x450 from "../admin-images/placeholder-333x450.png";
import Placeholder280x380 from "../admin-images/placeholder-280x380.png";
import eventStyles from "../../../styles/AddEvent.module.css";
import {BsPlusLg} from "react-icons/bs";
import {ThreeDots} from "react-loader-spinner";
import axios from "axios";
import {useRef, useState} from "react";
import {useRouter} from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles_width from "../../../styles/AddBanner.module.css"
import {signIn, useSession} from "next-auth/react";

export async function getServerSideProps(context) {
    const props = {
        eventId: null,
        data: {
            name: "",
            title: "",
            shortDescription: "",
            mainDescription: "",
            link: "",
            price: 0,
            bookingFee: 0,
            age: "don't show",
            eventDate: "",
            eventType: "Live",
            startTime: "",
            doorOpeningTime: "",
            displayEventListingFrom: "",
            desktopImage: "",
            mobileImage: "",
            seoTitle: "",
            seoDescription: "",
            performer: "",
            organizer: "",
            organizerUrl: "",
        },
        previewDesktopImage: Placeholder333x450.src,
        previewMobileImage: Placeholder280x380.src,
    }

    if (context.params.eventId.length > 1) {
        const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/event/" + context.params.eventId);
        const data = await res.json();
        props.eventId = data.result._id
        props.data = data.result

        if (data.result.desktopImage) {
            if (data.result.desktopImage.length > 0) {
                props.previewDesktopImage = data.result.desktopImage
            }
        }

        if (data.result.mobileImage) {
            if (data.result.mobileImage.length > 0) {
                props.previewMobileImage = data.result.mobileImage
            }
        }
    }

    return {props}
}

export default function AddEditEvent(props) {
    const router = useRouter();

    //  authentication here because this component is always used on admin :)
    const {status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        },
    })

    const [eventId, setEventId] = useState(props.eventId)
    const [pageTitle, setPageTitle] = useState(props.eventId ? "Edit event" : "Add event");
    let data = useRef(props.data);

    //  show the characters count
    let nameCount = useRef(null);
    let titleCount = useRef(null);
    let shortDescriptionCount = useRef(null);
    let mainDescriptionCount = useRef(null);
    let seoTitleCount = useRef(null);
    let seoDescriptionCount = useRef(null);
 
    let desktopImage = useRef(null);
    const [previewDesktopImage, setPreviewDesktopImage] = useState(props.previewDesktopImage);
    let desktopImageIsDirty = useRef(false);
    const hiddenDesktopImageFileInput = useRef(null);
    const removeDesktopImageButton = useRef(null);

    let mobileImage = useRef(null);
    const [previewMobileImage, setPreviewMobileImage] = useState(props.previewMobileImage);
    let mobileImageIsDirty = useRef(false);
    const hiddenMobileImageFileInput = useRef(null);
    const removeMobileImageButton = useRef(null);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleChangeDesktopImage = (e) => {
        let tempImage = e.target.files[0];
        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        if (tempImage.size > 0.5e6) {
            return toast.error("Image size should be less than be 500KB", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }

        desktopImage.current = e.target.files[0];
        desktopImageIsDirty.current = true;

        // if all good then render this image
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setPreviewDesktopImage(objectUrl);
        removeDesktopImageButton.current.style.display = "block";
    };

    const handleChangeMobileImage = (e) => {
        let checkMobileImage = e.target.files[0];
        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        if (checkMobileImage.size > 0.2e6) {
            return toast.error("Image size should be less than be 200KB", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }

        mobileImage.current = e.target.files[0];
        mobileImageIsDirty.current = true;

        // if all good then render this image
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setPreviewMobileImage(objectUrl);
        removeMobileImageButton.current.style.display = "block";
    };

    const removeDesktopImage = (e) => {
        e.preventDefault();
        desktopImage.current = null;
        desktopImageIsDirty.current = true;
        setPreviewDesktopImage(Placeholder333x450.src);
        removeDesktopImageButton.current.style.display = "none";
    };

    const removeMobileImage = (e) => {
        e.preventDefault();
        mobileImage.current = null;
        mobileImageIsDirty.current = true;
        setPreviewMobileImage(Placeholder280x380.src);
        removeMobileImageButton.current.style.display = "none";
    };

    const handleChange = (e) => {
        data.current[e.target.id] = e.target.value;

        //  for sure there's a better way to do this
        switch (e.target.id) {
            case "name":
                nameCount.current.textContent = e.target.value.length + "/" + characterLimit[e.target.id] + " characters";
                break;
            case "title":
                titleCount.current.textContent = e.target.value.length + "/" + characterLimit[e.target.id] + " characters";
                break;
            case "shortDescription":
                shortDescriptionCount.current.textContent = e.target.value.length + "/" + characterLimit[e.target.id] + " characters";
                break;
            // case "mainDescription":
            //     mainDescriptionCount.current.textContent = e.target.value.length + "/" + characterLimit[e.target.id] + " characters";
            //     break;
            case "seoTitle":
                seoTitleCount.current.textContent = e.target.value.length + "/" + characterLimit[e.target.id] + " characters";
                break;
            case "seoDescription":
                seoDescriptionCount.current.textContent = e.target.value.length + "/" + characterLimit[e.target.id] + " characters";
                break;
            default:
                //  do nothing
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsButtonDisabled(true);

        try {

            //  store Event
            await axios({
                url: (eventId ? `/api/event/${eventId}` : `/api/event`),
                method: (eventId ? `PUT` : `POST`),
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(data.current)
            }).then(async (response) => {
                //  saved Event
                console.log(response.data.result)

                //  Event Saved, set the id
                setEventId(response.data.result._id)

                //  store DesktopImage
                await storeDesktopImage(response.data.result._id, response.data.result.desktopImage);

                //  store MobileImage
                await storeMobileImage(response.data.result._id, response.data.result.mobileImage);

            }).catch((error) => {
                console.log(error)
                const data = error.response.data;
                throw {
                    code: data.code,
                    msg: data.msg,
                    errors: data.code == 422 ? data.errors : []
                }
            });

            await router.push("/manager/events");

        } catch (error) {

            if (error.errors) {
                if (error.errors.length > 0) {
                    error.errors.map((item) => {
                        toast.error(item.msg, {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                        });
                    })
                }
            }

            setIsButtonDisabled(false);
        }
    };

    const storeDesktopImage = async (eventId, storedDesktopImage) => {
        //  call delete first for cleanup
        if (storedDesktopImage.length > 0 && desktopImageIsDirty.current) {
            await fetch(`/api/event/upload-desktop-image/${eventId}`, {method: "DELETE"}).catch(error => {
                throw error;    //  propagate the error upwards
            });
        }

        //  save if any new image submitted
        if (desktopImage.current) {
            const formData = new FormData();
            formData.append("file", desktopImage.current);
            await axios({
                method: "POST",
                url: `/api/event/upload-desktop-image/${eventId}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            }).catch((error) => {
                throw error;    //  propagate the error upwards
            });
        }
    }

    const storeMobileImage = async (eventId, storedMobileImage) => {
        //  call delete first for cleanup
        if (storedMobileImage.length > 0 && mobileImageIsDirty.current) {
            await fetch(`/api/event/upload-mobile-image/${eventId}`, {method: "DELETE"}).catch(error => {
                throw error;    //  propagate the error upwards
            });
        }

        //  save if any new image submitted
        if (mobileImage.current) {
            const formData = new FormData();
            formData.append("file", mobileImage.current);
            await axios({
                method: "POST",
                url: `/api/event/upload-mobile-image/${eventId}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            }).catch((error) => {
                throw error;    //  propagate the error upwards
            });
        }
    }

    const characterLimit = {
        name: 40,
        title: 80,
        shortDescription: 160,
        mainDescription: 500,
        seoTitle: 60,
        seoDescription: 155
    }

    if (status === "authenticated") {
        return (
            <>
                <div className={styles.exceedContainer}>
                    <div className="EventContainer ">
                        <div className="row container" style={{margin: "0px", padding: "0px"}}>
                            <Dashboard/>
                            <div className="addEventRightSide col col-sm-6" style={{marginLeft: "1.5rem"}}>
                                <div className={styles.dashboardHeadings} style={{background: "#270F33"}}>
                                <span className={styles.DashboardBox} style={{display: "flex"}}>
                                    <Image
                                        src={dashboardImage}
                                        style={{
                                            width: "20px",
                                            height: "22px",
                                            marginTop: "8px",
                                        }}
                                        alt=""
                                    />
                                    <h5
                                        style={{
                                            fontSize: "25px",
                                            fontWeight: "500",
                                            marginLeft: "10px",
                                            color: "white",
                                            marginTop: "5.6px",
                                        }}
                                    >
                                        Dashboard
                                    </h5>
                                </span>
                                </div>
                                <div className={styles.h2}>
                                    <h5>{pageTitle}</h5>
                                </div>
                                <div className={styles.uploadingBanner}>
                                    <div className={styles.dragingImageBanner}>
                                        <div className={styles.dragingparaBanner}>
                                            <div className="row row-cols-md-2 g-4">

                                                {/* START - Desktop Image */}
                                                <div className="col">
                                                    <div className={styles.uploadingBanner2}>
                                                        <h5>Upload Main Image</h5>
                                                        <p>Supports: PNG, JPG, JPEG (Max Size : 500KB )</p>
                                                    </div>
                                                    <div>
                                                        <Image
                                                            src={previewDesktopImage}
                                                            alt="desktop image"
                                                            style={{width: "333px", height: "450px"}}
                                                            width={333}
                                                            height={450}
                                                            onClick={(e) => hiddenDesktopImageFileInput.current.click()}
                                                        />
                                                        <input
                                                            type="file"
                                                            id="uploadDesktopImage"
                                                            onChange={handleChangeDesktopImage}
                                                            accept="image/*"
                                                            style={{display: "none"}}
                                                            ref={hiddenDesktopImageFileInput}
                                                        ></input>
                                                        <br/>
                                                        <button
                                                            className="btn btn-danger"
                                                            style={{
                                                                border: "none",
                                                                borderRadius: "10px",
                                                                marginTop: "10px",
                                                                display: (props.data.desktopImage.length > 0 ? "block" : "none")
                                                            }}
                                                            onClick={removeDesktopImage}
                                                            ref={removeDesktopImageButton}
                                                        >
                                                            Remove Image
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* END - Desktop Image */}

                                                {/* START - Mobile Image */}
                                                <div style={{marginLeft: "-7rem"}} className=" col">
                                                    <div className={styles.uploadingBanner2}>
                                                        <h5>Upload Main Image (Mobile version)</h5>
                                                        <p>Supports: PNG, JPEG, JPG (Max Size : 200KB )</p>
                                                    </div>
                                                    <div>
                                                        <Image
                                                            src={previewMobileImage}
                                                            alt="Mobile image"
                                                            style={{width: "280px", height: "380px"}}
                                                            width={280}
                                                            height={380}
                                                            onClick={(e) => hiddenMobileImageFileInput.current.click()}
                                                        />
                                                        <input
                                                            type="file"
                                                            id="uploadMobileImage"
                                                            onChange={handleChangeMobileImage}
                                                            accept="image/*"
                                                            style={{display: "none"}}
                                                            ref={hiddenMobileImageFileInput}
                                                        ></input>
                                                        <br/>
                                                        <button
                                                            className="btn btn-danger"
                                                            style={{
                                                                border: "none",
                                                                borderRadius: "10px",
                                                                marginTop: "10px",
                                                                display: (props.data.mobileImage.length > 0 ? "block" : "none")
                                                            }}
                                                            onClick={removeMobileImage}
                                                            ref={removeMobileImageButton}
                                                        >
                                                            Remove Image
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* END - Mobile Image */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={eventStyles.formStart}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Event Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Name"
                                            className={`${styles["form-control"]}`}
                                            id="name"
                                            aria-describedby="emailHelp"
                                            defaultValue={props.data.name}
                                            maxLength={characterLimit.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <span className={styles.characterEdit} ref={nameCount}>
                                        {characterLimit.name - props.data.name.trim().length}/{characterLimit.name} Characters
                                    </span>

                                    <div className="mb-3" style={{marginTop: "-1.3rem"}}>
                                        <label htmlFor="title" className="form-label">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Title"
                                            className={`${styles["form-control"]}`}
                                            id="title"
                                            maxLength={characterLimit.title}
                                            aria-describedby="emailHelp"
                                            defaultValue={props.data.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <span className={styles.characterEdit} ref={titleCount}>
                                        {characterLimit.title - props.data.title.trim().length}/{characterLimit.title} Characters
                                    </span>

                                    <div className="mb-3" style={{marginTop: "-1.3rem"}}>
                                        <label htmlFor="shortDescription" className="form-label">
                                            Description
                                        </label>

                                        <textarea
                                            placeholder="Enter event description"
                                            id="shortDescription"
                                            defaultValue={props.data.shortDescription}
                                            onChange={handleChange}
                                            maxLength={characterLimit.shortDescription}
                                            rows="2.5"
                                            className={styles.textareScroll}
                                            cols={102}

                                        ></textarea>
                                    </div>
                                    <span className={styles.characterEdit} ref={shortDescriptionCount}>
                                        {characterLimit.shortDescription - props.data.shortDescription.trim().length}/{characterLimit.shortDescription} Characters
                                    </span>
                                    <div className="mb-3" style={{marginTop: "-1.3rem", display: "none"}}>
                                        <label htmlFor="mainDescription" className="form-label">
                                            Main Description
                                        </label>
                                        <textarea
                                            id="mainDescription"
                                            onChange={handleChange}
                                            defaultValue={props.data.mainDescription}
                                            placeholder="Enter main description"
                                            maxLength={characterLimit.mainDescription}
                                            rows="5"
                                            cols="103"
                                            className={styles.textareScroll}
                                        ></textarea>
                                    </div>
                                    <span className={styles.characterEdit} ref={mainDescriptionCount}
                                          style={{display: "none"}}>
                                        {characterLimit.mainDescription - props.data.mainDescription.trim().length}/{characterLimit.mainDescription} Characters
                                    </span>
                                    <div className="mb-3" style={{marginTop: "-1.3rem"}}>
                                        <label htmlFor="link" className="form-label">
                                            Event Link
                                        </label>
                                        <input
                                            type="url"
                                            placeholder=" Event Link"
                                            className={`${styles["form-control"]}`}
                                            id="link"
                                            aria-describedby="emailHelp"
                                            defaultValue={props.data.link}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="row row-cols-md-2 g-4">
                                        <div className="col">
                                            {" "}
                                            <div className="euroPlaceholder  mb-3">
                                                <label htmlFor="price" className="form-label">
                                                    Price (example: £10 or TBA)
                                                </label>

                                                <input
                                                    placeholder="Please type £10 or TBA"
                                                    type="text"
                                                    className={`${styles["form-controlPrice"]}`}
                                                    id="price"
                                                    aria-describedby="emailHelp"
                                                    defaultValue={props.data.price}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col">
                                            {" "}
                                            <BsPlusLg
                                                style={{
                                                    position: "relative",
                                                    top: "2.5rem",
                                                    fontSize: "1.2rem",
                                                    left: "1.3rem",
                                                }}
                                            />
                                            <div
                                                className="euroPlaceholder  mb-3"
                                                style={{marginLeft: "3.5rem", marginTop: "-1.4rem"}}
                                            >
                                                <label htmlFor="bookingFee" className="form-label">
                                                    Add Booking Fee
                                                    <span style={{opacity: "70%", fontSize: "13px"}}>
                                                        &nbsp;(optional)
                                                      </span>
                                                </label>

                                                <input
                                                    placeholder="£"
                                                    type="number"
                                                    className={`${styles["form-controlPrice"]}`}
                                                    id="bookingFee"
                                                    aria-describedby="emailHelp"
                                                    defaultValue={props.data.bookingFee}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <br/>
                                    <br/>
                                    <div
                                        className="startTime startTimeEvent"
                                        style={{marginLeft: "-1rem"}}
                                    >
                                        <div className="container">
                                            <div className="row row-cols-3">
                                                <div className="timeHeading col">
                                                    <label htmlFor="startTime" className="form-label">
                                                        Start Time
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter start time"
                                                        className={`${styles["dateBanner"]}`}
                                                        id="startTime"
                                                        maxLength={80}
                                                        aria-describedby="emailHelp"
                                                        defaultValue={props.data.startTime.toLowerCase()}
                                                        onChange={handleChange}
                                                    />
                                                    <span className={styles.timeEdit}>
                                                        eg: 8pm
                                                    </span>
                                                </div>

                                                <div className="timeHeading col">
                                                    <label
                                                        htmlFor="doorOpeningTime"
                                                        className="form-label"
                                                    >
                                                        Door Opening Time
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter opening time"
                                                        className={`${styles["dateBanner"]}`}
                                                        id="doorOpeningTime"
                                                        maxLength={80}
                                                        aria-describedby="emailHelp"
                                                        defaultValue={props.data.doorOpeningTime.toLowerCase()}
                                                        onChange={handleChange}
                                                    />
                                                    <span className={styles.timeEdit}>
                                                        eg: 6:30pm
                                                    </span>
                                                </div>

                                                <div className="col">
                                                    <label htmlFor="age">
                                                        Select Age
                                                    </label>

                                                    <select
                                                        id="age"
                                                        onChange={handleChange}
                                                        className={`${styles["dateBanner"]}`}
                                                        defaultValue={props.data.age}
                                                        style={{marginTop: "1.4rem"}}
                                                    >
                                                        <option value={'don\'t show'}>Don't show</option>
                                                        <option value={'18+'}>18+</option>
                                                        <option value={'all ages'}>All ages</option>
                                                    </select>
                                                </div>
                                                <div
                                                    className="timeHeading datenewStyle timeheadingDate TimeHeadingTime col">
                                                    <p style={{marginTop: "2rem", width: "12rem"}}>
                                                        Display Event Listing From
                                                    </p>{" "}
                                                    <input
                                                        type="date"
                                                        className={eventStyles.dateEvent}
                                                        id="displayEventListingFrom"
                                                        defaultValue={props.data.displayEventListingFrom}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div
                                                    className="timeHeading datenewStyle timeheadingDate col"
                                                    style={{
                                                        // marginRight: "-17rem",
                                                        marginTop: "2rem",
                                                    }}
                                                >
                                                    <p>Event Date</p>{" "}
                                                    <input
                                                        type="date"
                                                        id="eventDate"
                                                        className={eventStyles.dateEvent}
                                                        defaultValue={props.data.eventDate}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col" style={{marginTop: "31px"}}>
                                                    <label htmlFor="eventType">
                                                        Event Type
                                                    </label>

                                                    <select
                                                        id="eventType"
                                                        className={`${styles["dateBanner"]}`}
                                                        onChange={handleChange}
                                                        defaultValue={props.data.eventType}
                                                    >
                                                        <option>Live</option>
                                                        <option>Sold Out</option>
                                                        <option>Cancelled</option>
                                                        <option>Private Booking</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3" style={{marginTop: "1rem"}}>
                                        <label htmlFor="performer" className="form-label">
                                            Performer (Google structured data)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Performer"
                                            className={`${styles["form-control"]}`}
                                            id="performer"
                                            aria-describedby="emailHelp"
                                            defaultValue={props.data.performer}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="organizer" className="form-label">
                                            Organizer (Google structured data)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Organizer"
                                            className={`${styles["form-control"]}`}
                                            id="organizer"
                                            aria-describedby="emailHelp"
                                            defaultValue={props.data.organizer}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="organizerUrl" className="form-label">
                                            Organizer Page URL (Google structured data)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Organizer Page URL"
                                            className={`${styles["form-control"]}`}
                                            id="organizerUrl"
                                            aria-describedby="emailHelp"
                                            defaultValue={props.data.organizerUrl}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className={styles.seoContainer}>
                                        <div style={{marginTop: "20px"}} className={styles.seoBox}>
                                            <div className={styles.seoHeading}>
                                                <h5>SEO Details</h5>
                                            </div>
                                            <div className={styles.SeoFields}>
                                                <div className="mb-3">
                                                    <label htmlFor="seoTitle" className="form-label">
                                                        SEO Title
                                                    </label>
                                                    <br/>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter SEO Title"
                                                        className={`${styles["form-control"]} ${styles["form-controlSeo"]}`}
                                                        id="seoTitle"
                                                        aria-describedby="emailHelp"
                                                        defaultValue={props.data.seoTitle}
                                                        maxLength={characterLimit.seoTitle}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <span
                                                    className={`${styles["characterEdit"]} ${styles["characterEditSeo"]}`}
                                                    ref={seoTitleCount}>
                                                    {characterLimit.seoTitle - props.data.seoTitle.trim().length}/{characterLimit.seoTitle} Characters
                                                </span>

                                                <div className="mb-3">
                                                    <label htmlFor="seoDescription" className="form-label">
                                                        SEO Description
                                                    </label>
                                                    <br/>
                                                    <textarea
                                                        placeholder="Enter SEO Description"
                                                        className={`${styles["form-control"]} ${styles["form-controlSeo"]} ${styles["form-seodescriptionheight"]}`}
                                                        id="seoDescription"
                                                        aria-describedby="emailHelp"
                                                        defaultValue={props.data.seoDescription}
                                                        maxLength={characterLimit.seoDescription}
                                                        onChange={handleChange}
                                                        rows="2.5"

                                                    ></textarea>
                                                </div>
                                                <span
                                                    className={`${styles["characterEdit"]} ${styles["characterEditSeo"]}`}
                                                    ref={seoDescriptionCount}>
                                                    {characterLimit.seoDescription - props.data.seoDescription.trim().length}/{characterLimit.seoDescription} Characters
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="submitButton" style={{marginTop: "4rem"}}>
                                        {isButtonDisabled === false ? (
                                            <button
                                                className={styles.buttonSubmit}
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </button>
                                        ) : (
                                            <ThreeDots
                                                height="80"
                                                width="80"
                                                radius="9"
                                                color="#003831"
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                wrapperClassName=""
                                                visible={true}
                                            />
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
                <div className={styles_width.exceedScreen}>
                    <p>Screen size should be atleast 1000 pixels to access Admin Panel.</p>
                </div>
            </>
        )
    }
}