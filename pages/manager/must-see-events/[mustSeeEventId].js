import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dashboardImage from "../admin-images/dashboard-image.png";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Dashboard from "../dashboard";
import Image from "next/image";
import {ThreeDots} from "react-loader-spinner";
import styles from "../../../styles/AddBanner.module.css"
import {useRouter} from "next/router";
import Placeholder515x550 from "../admin-images/placeholder-515x550.png";
import Placeholder250x270 from "../admin-images/placeholder-250x270.png";
import styles_width from "../../../styles/AddBanner.module.css"
import {signIn, useSession} from "next-auth/react";


export async function getServerSideProps(context) {
    const props = {
        mustSeeEventId: null,
        data: {
            eventId: "",
            order: 0,
            desktopImage: "",
            mobileImage: "",
            showEventDetails: "no"
        },
        previewDesktopImage: Placeholder515x550.src,
        previewMobileImage: Placeholder250x270.src,
        events: []
    }

    //  load the possible events for the dropdown box
    const resFetchEvents = await fetch(process.env.NEXT_PUBLIC_URL + "/api/event");
    const dataFetchEvents = await resFetchEvents.json();
    props.events = dataFetchEvents.result

    //  load must see event in case we doing edit
    if (context.params.mustSeeEventId.length > 1) {
        const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/must-see-event/" + context.params.mustSeeEventId);
        const data = await res.json();
        props.mustSeeEventId = data.result._id
        props.data = {
            eventId: data.result.eventId,
            order: data.result.order,
            desktopImage: data.result.desktopImage,
            mobileImage: data.result.mobileImage,
            showEventDetails: data.result.showEventDetails == true ? "yes" : "no"
        }

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
    } else {    //  new must see event
        //  gets the first event id for the default value on a create new
        if (props.events.length > 0) {
            props.data.eventId = props.events[0]._id
        }
    }



    return {props}
}

export default function AddEditMustSeeEvent(props) {
    const router = useRouter();

    //  authentication here because this component is always used on admin :)
    const {status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        },
    })

    const [mustSeeEventId, setMustSeeEventId] = useState(props.mustSeeEventId)
    const [pageTitle, setPageTitle] = useState(props.mustSeeEventId ? "Edit must see event" : "Add must see event");
    let data = useRef(props.data);
    const [events, setEvents] = useState(props.events)

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
        setPreviewDesktopImage(Placeholder515x550.src);
        removeDesktopImageButton.current.style.display = "none";
    };

    const removeMobileImage = (e) => {
        e.preventDefault();
        mobileImage.current = null;
        mobileImageIsDirty.current = true;
        setPreviewMobileImage(Placeholder250x270.src);
        removeMobileImageButton.current.style.display = "none";
    };

    const handleChange = (e) => {
        data.current[e.target.id] = e.target.value;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
console.log(data.current)
        setIsButtonDisabled(true);

        try {

            //  store Must See Event
            await axios({
                url: (mustSeeEventId ? `/api/must-see-event/${mustSeeEventId}` : `/api/must-see-event`),
                method: (mustSeeEventId ? `PUT` : `POST`),
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify({
                    eventId: data.current.eventId,
                    order: data.current.order,
                    showEventDetails: data.current.showEventDetails == "yes"
                })
            }).then(async (response) => {
                //  saved Must See Event
                console.log(response.data.result)

                //  Must See Event Saved, set the id
                setMustSeeEventId(response.data.result._id)

                //  store DesktopImage
                await storeDesktopImage(response.data.result._id, response.data.result.desktopImage);

                //  store MobileImage
                await storeMobileImage(response.data.result._id, response.data.result.mobileImage);
            }).catch((error) => {
                const data = error.response.data;
                throw {
                    code: data.code,
                    msg: data.msg,
                    errors: data.code == 422 ? data.errors : []
                }
            });

            router.push("/manager/must-see-events");

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

    const storeDesktopImage = async (mustSeeEventId, storedDesktopImage) => {
        //  call delete first for cleanup
        if (storedDesktopImage.length > 0 && desktopImageIsDirty.current) {
            await fetch(`/api/must-see-event/upload-desktop-image/${mustSeeEventId}`, {method: "DELETE"});
        }

        //  save if any new image submitted
        if (desktopImage.current) {
            const formData = new FormData();
            formData.append("file", desktopImage.current);
            await axios({
                method: "POST",
                url: `/api/must-see-event/upload-desktop-image/${mustSeeEventId}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            }).catch((error) => {
                throw error;    //  propagate the error upwards
            });
        }
    }

    const storeMobileImage = async (mustSeeEventId, storedMobileImage) => {
        //  call delete first for cleanup
        if (storedMobileImage.length > 0 && mobileImageIsDirty.current) {
            await fetch(`/api/must-see-event/upload-mobile-image/${mustSeeEventId}`, {method: "DELETE"});
        }

        //  save if any new image submitted
        if (mobileImage.current) {
            const formData = new FormData();
            formData.append("file", mobileImage.current);
            await axios({
                method: "POST",
                url: `/api/must-see-event/upload-mobile-image/${mustSeeEventId}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            }).catch((error) => {
                throw error;    //  propagate the error upwards
            });
        }
    }

    if (status === "authenticated") {
        return (
            <>
                <div className={styles.exceedContainer}>
                    <div className="EventContainer ">
                        <div className="row container" style={{margin: "0px", padding: "0px"}}>
                            <Dashboard/>
                            <div className="addEventRightSide col col-sm-6 " style={{marginLeft: "1.5rem"}}>
                                <div className={styles.dashboardHeadings} style={{background: "#270F33"}}>
                                    <span className={styles.DashboardBox} style={{display: "flex"}}>
                                      <Image
                                          src={dashboardImage}
                                          style={{
                                              width: "20px",
                                              height: "22px",
                                              marginTop: "8px"
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
                                                        <p>Supports: PNG, JPG, JPEG (Max Size : 500KB)</p>
                                                    </div>

                                                    {/*<div className={styles.LinesImagesBanner}>*/}
                                                    <div>
                                                        <Image
                                                            src={previewDesktopImage}
                                                            alt="desktop image"
                                                            style={{width: "515px", height: "550px"}}
                                                            width={515}
                                                            height={550}
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
                                                <div
                                                    style={{
                                                        marginLeft: "0rem",
                                                        position: "relative",
                                                        left: "4rem",
                                                    }}
                                                    className=" col"
                                                >
                                                    <div className={styles.uploadingBanner2}>
                                                        <h5>Upload Main Image (Mobile version)</h5>
                                                        <p>Supports: PNG, JPG, JPEG (Max Size : 200KB)</p>
                                                    </div>
                                                    {/*<div className={styles.LinesImagesBanner}>*/}
                                                    <div>
                                                        <Image
                                                            src={previewMobileImage}
                                                            alt="Mobile image"
                                                            style={{width: "250px", height: "270px"}}
                                                            width={250}
                                                            height={270}
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
                                <div className={styles.formStart} style={{marginTop: "3rem"}}>
                                    <div className="mb-3" style={{marginTop: "2rem"}}>
                                        <label htmlFor="eventId">Linked Event</label>
                                        <select
                                            style={{
                                                width: "43rem",
                                                borderRadius: "10px",
                                                height: "3rem",
                                                fontSize: "13px",
                                                padding: "12px",
                                            }}
                                            id="eventId"
                                            onChange={handleChange}
                                            defaultValue={props.data.eventId}
                                        >
                                            {events.map((item, i) => (
                                                <option key={i} value={item._id}>{item.name} ({item.eventDate})</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3" style={{marginTop: "2rem"}}>
                                        <label htmlFor="order" className="form-label">
                                            Order
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter Order"
                                            className={`${styles["form-control"]}`}
                                            id="order"
                                            aria-describedby="emailHelp"
                                            defaultValue={props.data.order}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <label htmlFor="showEventDetails">Show Event Details</label>
                                    <select
                                        style={{
                                            width: "43rem",
                                            borderRadius: "10px",
                                            height: "3rem",
                                            fontSize: "13px",
                                            padding: "12px",
                                        }}
                                        id="showEventDetails"
                                        onChange={handleChange}
                                        defaultValue={props.data.showEventDetails}
                                    >
                                        <option key={"no"} value={"no"}>No</option>
                                        <option key={"yes"} value={"yes"}>Yes</option>
                                    </select>

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
