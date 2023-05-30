import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Placeholder1440x692 from "../admin-images/placeholder-1440x692.png";
import Placeholder640x360 from "../admin-images/placeholder-640x360.png";
import {useRef, useState} from "react";
import Dashboard from "../dashboard";
import {ThreeDots} from "react-loader-spinner";
import dashboardImage from "../admin-images/dashboard-image.png";
import styles from "../../../styles/AddBanner.module.css";
import eventStyles from "../../../styles/AddEvent.module.css";
import {useRouter} from "next/router";
import axios from "axios";
import Image from "next/image";
import styles_width from "../../../styles/AddBanner.module.css"
import {signIn, useSession} from "next-auth/react";


export async function getServerSideProps(context) {
    const props = {
        bannerId: null,
        data: {
            name: "",
            link: "",
            eventType: "Live",  //  because is a dropdownbox, first value selected before onChange
            startDate: "",
            endDate: "",
            desktopImage: "",
            mobileImage: ""
        },
        previewDesktopImage: Placeholder1440x692.src,
        previewMobileImage: Placeholder640x360.src,
    }

    if (context.params.bannerId.length > 1) {
        const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/banner/" + context.params.bannerId);
        const data = await res.json();
        props.bannerId = data.result._id
        props.data = data.result

        if (data.result.desktopImage) {
            if (data.result.desktopImage.length > 0) { props.previewDesktopImage = data.result.desktopImage }
        }

        if (data.result.mobileImage) {
            if (data.result.mobileImage.length > 0) { props.previewMobileImage = data.result.mobileImage }
        }
    }

    return {props}
}

export default function AddEditBanner(props) {
    const router = useRouter();

    //  authentication here because this component is always used on admin :)
    const {status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        },
    })

    const [bannerId, setBannerId] = useState(props.bannerId)
    const [pageTitle, setPageTitle] = useState(props.bannerId ? "Edit banner" : "Add banner");
    let data = useRef(props.data);

    //  show the characters count
    let nameCount = useRef(null);

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

        if (tempImage.size > 1e6) {
            return toast.error("Image size should be less than be 1MB", {
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

        if (checkMobileImage.size > 0.5e6) {
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
        setPreviewDesktopImage(Placeholder1440x692.src);
        removeDesktopImageButton.current.style.display = "none";
    };

    const removeMobileImage = (e) => {
        e.preventDefault();
        mobileImage.current = null;
        mobileImageIsDirty.current = true;
        setPreviewMobileImage(Placeholder640x360.src);
        removeMobileImageButton.current.style.display = "none";
    };

    const handleChange = (e) => {
        data.current[e.target.id] = e.target.value;

        //  for sure there's a better way to do this
        switch (e.target.id) {
            case "name":
                nameCount.current.textContent = e.target.value.length + "/" + characterLimit[e.target.id] + " characters";
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

            //  store Banner
            await axios({
                url: (bannerId ? `/api/banner/${bannerId}` : `/api/banner`),
                method: (bannerId ? `PUT` : `POST`),
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(data.current)
            }).then(async (response) => {
                //  saved Banner
                console.log(response.data.result)

                //  Banner Saved, set the id
                setBannerId(response.data.result._id)

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

            await router.push("/manager/banners");

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

    const storeDesktopImage = async (bannerId, storedDesktopImage) => {
        //  call delete first for cleanup
        if (storedDesktopImage.length > 0 && desktopImageIsDirty.current) {
            await fetch(`/api/banner/upload-desktop-image/${bannerId}`, {method: "DELETE"});
        }

        //  save if any new image submitted
        if (desktopImage.current) {
            const formData = new FormData();
            formData.append("file", desktopImage.current);
            await axios({
                method: "POST",
                url: `/api/banner/upload-desktop-image/${bannerId}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            }).catch((error) => {
                throw error;    //  propagate the error upwards
            });
        }
    }

    const storeMobileImage = async (bannerId, storedMobileImage) => {
        //  call delete first for cleanup
        if (storedMobileImage.length > 0 && mobileImageIsDirty.current) {
            await fetch(`/api/banner/upload-mobile-image/${bannerId}`, {method: "DELETE"});
        }

        //  save if any new image submitted
        if (mobileImage.current) {
            const formData = new FormData();
            formData.append("file", mobileImage.current);
            await axios({
                method: "POST",
                url: `/api/banner/upload-mobile-image/${bannerId}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            }).catch((error) => {
                throw error;    //  propagate the error upwards
            });
        }
    }

    const characterLimit = {
        name: 30,
    }

    if (status === "authenticated") {
        return (
            <>
                <div className={styles.exceedContainer}>
                    <div className="EventContainer ">
                        <div className="row container" style={{margin: "0px", padding: "0px"}}>
                            <Dashboard/>
                            <div className="addBannerRightSide col col-sm-6" style={{marginLeft: "1.5rem"}}>
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
                                            <div className="row row-cols-md-1 g-4">

                                                {/* START - Desktop Image */}
                                                <div className="col">
                                                    <div className={styles.uploadingBanner2}>
                                                        <h5>Upload Main Image - 1440x692</h5>
                                                        <p>Supports : PNG, JPG, JPEG (Max Size: 1MB)</p>
                                                    </div>

                                                    <div>
                                                        <Image
                                                            src={previewDesktopImage}
                                                            alt="desktop image"
                                                            style={{width: "1008px", height: "484px"}}
                                                            width={1008}
                                                            height={484}
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
                                                <div className=" col">
                                                    <div className={styles.uploadingBanner2}>
                                                        <h5>
                                                            Upload Main Image (Mobile version) - 640x360
                                                        </h5>
                                                        <p>Supports : PNG, JPG, JPEG (Max Size: 500KB)</p>
                                                    </div>
                                                    <div>
                                                        <Image
                                                            src={previewMobileImage}
                                                            alt="Mobile image"
                                                            style={{width: "448px", height: "252px"}}
                                                            width={448}
                                                            height={252}
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
                                            Banner Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Banner Name"
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
                                    <div className="mb-3">
                                        <label htmlFor="link" className="form-label">
                                            Banner Link
                                        </label>
                                        <input
                                            /*required*/
                                            type="text"
                                            placeholder="Banner Title"
                                            className={`${styles["form-control"]}`}
                                            id="link"
                                            aria-describedby="emailHelp"
                                            defaultValue={props.data.link}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <br/>
                                    <br/>
                                    {/* //start time// */}
                                    <div className="startTime">
                                        <h5>Banner Duration</h5>
                                        <div
                                            className="row row-cols-3"
                                            style={{width: "44rem"}}
                                        >
                                            <div className="timeHeading datenewStyle  TimeHeadingTime col">
                                                <p>Display Event Listing From</p>{" "}
                                                <input
                                                    /*required*/
                                                    type="date"
                                                    id="startDate"
                                                    onChange={handleChange}
                                                    defaultValue={props.data.startDate}
                                                    className={eventStyles.dateEvent}
                                                />
                                            </div>
                                            <div className="timeHeading datenewStyle  TimeHeadingTime col">
                                                <p>Display Event Listing To</p>{" "}
                                                <input
                                                    /*required*/
                                                    type="date"
                                                    id="endDate"
                                                    defaultValue={props.data.endDate}
                                                    onChange={handleChange}
                                                    className={eventStyles.dateEvent}
                                                />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="eventType">
                                                    Event Type
                                                </label>

                                                <select
                                                    id="eventType"
                                                    className={`${styles["dateBanner"]}`}
                                                    defaultValue={props.data.eventType}
                                                    onChange={handleChange}
                                                >
                                                    <option value={"Live"}>Live</option>
                                                    <option value={"Sold Out"}>Sold Out</option>
                                                    <option value={"Cancelled"}>Cancelled</option>
                                                    <option value={"Private Booking"}>Private Booking</option>
                                                </select>
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