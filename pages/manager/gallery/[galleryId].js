import React, {useRef, useState} from "react";
import dashboardImage from "../admin-images/dashboard-image.png";
import Placeholder305x290 from "../admin-images/placeholder-305x290.png";
import Placeholder630x600 from "../admin-images/placeholder-630x600.png";
import Placeholder130x130 from "../admin-images/placeholder-130x130.png";
import Placeholder280x270 from "../admin-images/placeholder-280x270.png";
import Dashboard from "../dashboard";
import axios from "axios";
import {ThreeDots} from "react-loader-spinner";
import Image from "next/image";
import styles from "../../../styles/AddBanner.module.css"
import {useRouter} from "next/router";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles_width from "../../../styles/AddBanner.module.css"
import {signIn, useSession} from "next-auth/react";


export async function getServerSideProps(context) {
    const props = {
        galleryId: null,
        data: {
            smallWebImage: "",
            bigWebImage: "",
            smallMobileImage: "",
            bigMobileImage: "",
            category: "",
            uploadedDate: "",
            name: "",
            order: 0,
            altText: "",
        },
        previewBigWebImage: Placeholder630x600.src,
        previewSmallWebImage: Placeholder305x290.src,
        previewBigMobileImage: Placeholder280x270.src,
        previewSmallMobileImage: Placeholder130x130.src,
    }

    if (context.params.galleryId.length > 1) {
        const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/gallery/" + context.params.galleryId);
        const data = await res.json();
        props.galleryId = data.result._id
        props.data = data.result

        if (data.result.smallWebImage) {
            if (data.result.smallWebImage.length > 0) {
                props.previewSmallWebImage = data.result.smallWebImage
            }
        }

        if (data.result.bigWebImage) {
            if (data.result.bigWebImage.length > 0) {
                props.previewBigWebImage = data.result.bigWebImage
            }
        }

        if (data.result.smallMobileImage) {
            if (data.result.smallMobileImage.length > 0) {
                props.previewSmallMobileImage = data.result.smallMobileImage
            }
        }

        if (data.result.bigMobileImage) {
            if (data.result.bigMobileImage.length > 0) {
                props.previewBigMobileImage = data.result.bigMobileImage
            }
        }
    }

    return {props}
}

export default function AddEditGallery(props) {
    const router = useRouter();

    //  authentication here because this component is always used on admin :)
    const {status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        },
    })

    const [galleryId, setGalleryId] = useState(props.galleryId)
    const [pageTitle, setPageTitle] = useState(props.galleryId ? "Edit gallery image" : "Add gallery image");
    let data = useRef(props.data);

    //  show the characters count
    let altTextCount = useRef(null);

    let bigWebImage = useRef(null);
    const [previewBigWebImage, setPreviewBigWebImage] = useState(props.previewBigWebImage);
    let bigWebImageIsDirty = useRef(false);
    const hiddenBigWebImageFileInput = useRef(null);
    const removeBigWebImageButton = useRef(null);

    let smallWebImage = useRef(null);
    const [previewSmallWebImage, setPreviewSmallWebImage] = useState(props.previewSmallWebImage);
    let smallWebImageIsDirty = useRef(false);
    const hiddenSmallWebImageFileInput = useRef(null);
    const removeSmallWebImageButton = useRef(null);

    let bigMobileImage = useRef(null);
    const [previewBigMobileImage, setPreviewBigMobileImage] = useState(props.previewBigMobileImage);
    let bigMobileImageIsDirty = useRef(false);
    const hiddenBigMobileImageFileInput = useRef(null);
    const removeBigMobileImageButton = useRef(null);

    let smallMobileImage = useRef(null);
    const [previewSmallMobileImage, setPreviewSmallMobileImage] = useState(props.previewSmallMobileImage);
    let smallMobileImageIsDirty = useRef(false);
    const hiddenSmallMobileImageFileInput = useRef(null);
    const removeSmallMobileImageButton = useRef(null);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleChangeBigWebImage = (e) => {
        let tempImage = e.target.files[0];
        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        if (tempImage.size > 1e6) {
            return toast.error("Big Web Image size should be less than be 1MB", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }

        bigWebImage.current = e.target.files[0];
        bigWebImageIsDirty.current = true;

        // if all good then render this image
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setPreviewBigWebImage(objectUrl);
        removeBigWebImageButton.current.style.display = "block";
    };

    const handleChangeSmallWebImage = (e) => {
        let tempImage = e.target.files[0];
        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        if (tempImage.size > 0.5e6) {
            return toast.error("Small Web Image size should be less than be 500KB", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }

        smallWebImage.current = e.target.files[0];
        smallWebImageIsDirty.current = true;

        // if all good then render this image
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setPreviewSmallWebImage(objectUrl);
        removeSmallWebImageButton.current.style.display = "block";
    };

    const handleChangeBigMobileImage = (e) => {
        let tempImage = e.target.files[0];
        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        if (tempImage.size > 0.5e6) {
            return toast.error("Big Mobile Image size should be less than be 500KB", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }

        bigMobileImage.current = e.target.files[0];
        bigMobileImageIsDirty.current = true;

        // if all good then render this image
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setPreviewBigMobileImage(objectUrl);
        removeBigMobileImageButton.current.style.display = "block";
    };

    const handleChangeSmallMobileImage = (e) => {
        let tempImage = e.target.files[0];
        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        if (tempImage.size > 0.2e6) {
            return toast.error("Small Mobile Image size should be less than be 200KB", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }

        smallMobileImage.current = e.target.files[0];
        smallMobileImageIsDirty.current = true;

        // if all good then render this image
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setPreviewSmallMobileImage(objectUrl);
        removeSmallMobileImageButton.current.style.display = "block";
    };

    const removeBigWebImage = (e) => {
        e.preventDefault();
        bigWebImage.current = null;
        bigWebImageIsDirty.current = true;
        setPreviewBigWebImage(Placeholder630x600.src);
        removeBigWebImageButton.current.style.display = "none";
    };
    const removeSmallWebImage = (e) => {
        e.preventDefault();
        smallWebImage.current = null;
        smallWebImageIsDirty.current = true;
        setPreviewSmallWebImage(Placeholder305x290.src);
        removeSmallWebImageButton.current.style.display = "none";
    };
    const removeBigMobileImage = (e) => {
        e.preventDefault();
        bigMobileImage.current = null;
        bigMobileImageIsDirty.current = true;
        setPreviewBigMobileImage(Placeholder280x270.src);
        removeBigMobileImageButton.current.style.display = "none";
    };
    const removeSmallMobileImage = (e) => {
        e.preventDefault();
        smallMobileImage.current = null;
        smallMobileImageIsDirty.current = true;
        setPreviewSmallMobileImage(Placeholder130x130.src);
        removeSmallMobileImageButton.current.style.display = "none";
    };

    const handleChange = (e) => {
        data.current[e.target.id] = e.target.value;

        //  for sure there's a better way to do this
        switch (e.target.id) {
            case "altText":
                altTextCount.current.textContent = e.target.value.length + "/" + characterLimit[e.target.id] + " characters";
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

            //  store Gallery
            await axios({
                url: (galleryId ? `/api/gallery/${galleryId}` : `/api/gallery`),
                method: (galleryId ? `PUT` : `POST`),
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify({
                    category: data.current.category,
                    name: data.current.name,
                    order: data.current.order,
                    altText: data.current.altText,
                })
            }).then(async (response) => {
                //  saved Gallery
                console.log(response.data.result)

                //  Gallery Saved, set the id
                setGalleryId(response.data.result._id)

                //  store BigWebImage
                await storeBigWebImage(response.data.result._id, response.data.result.bigWebImage);

                //  store SmallWebImage
                await storeSmallWebImage(response.data.result._id, response.data.result.smallWebImage);

                //  store BigMobileImage
                await storeBigMobileImage(response.data.result._id, response.data.result.bigMobileImage);

                //  store SmallMobileImage
                await storeSmallMobileImage(response.data.result._id, response.data.result.smallMobileImage);


            }).catch((error) => {
                const data = error.response.data;
                throw {
                    code: data.code,
                    msg: data.msg,
                    errors: data.code == 422 ? data.errors : []
                }
            });

            await router.push("/manager/gallery")

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

    const storeBigWebImage = async (galleryId, storedBigWebImage) => {
        //  call delete first for cleanup
        if (storedBigWebImage.length > 0 && bigWebImageIsDirty.current) {
            await fetch(`/api/gallery/web-image-big/${galleryId}`, {method: "DELETE"});
        }

        //  save if any new image submitted
        if (bigWebImage.current) {
            const formData = new FormData();
            formData.append("file", bigWebImage.current);
            await axios({
                method: "POST",
                url: `/api/gallery/web-image-big/${galleryId}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            }).catch((error) => {
                throw error;    //  propagate the error upwards
            });
        }
    }

    const storeSmallWebImage = async (galleryId, storedSmallWebImage) => {
        //  call delete first for cleanup
        if (storedSmallWebImage.length > 0 && smallWebImageIsDirty.current) {
            await fetch(`/api/gallery/web-image-small/${galleryId}`, {method: "DELETE"});
        }

        //  save if any new image submitted
        if (smallWebImage.current) {
            const formData = new FormData();
            formData.append("file", smallWebImage.current);
            await axios({
                method: "POST",
                url: `/api/gallery/web-image-small/${galleryId}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            }).catch((error) => {
                throw error;    //  propagate the error upwards
            });
        }
    }

    const storeBigMobileImage = async (galleryId, storedBigMobileImage) => {
        //  call delete first for cleanup
        if (storedBigMobileImage.length > 0 && bigMobileImageIsDirty.current) {
            await fetch(`/api/gallery/mobile-image-big/${galleryId}`, {method: "DELETE"});
        }

        //  save if any new image submitted
        if (bigMobileImage.current) {
            const formData = new FormData();
            formData.append("file", bigMobileImage.current);
            await axios({
                method: "POST",
                url: `/api/gallery/mobile-image-big/${galleryId}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            }).catch((error) => {
                throw error;    //  propagate the error upwards
            });
        }
    }

    const storeSmallMobileImage = async (galleryId, storedSmallMobileImage) => {
        //  call delete first for cleanup
        if (storedSmallMobileImage.length > 0 && smallMobileImageIsDirty.current) {
            await fetch(`/api/gallery/mobile-image-small/${galleryId}`, {method: "DELETE"});
        }

        //  save if any new image submitted
        if (smallMobileImage.current) {
            const formData = new FormData();
            formData.append("file", smallMobileImage.current);
            await axios({
                method: "POST",
                url: `/api/gallery/mobile-image-small/${galleryId}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            }).catch((error) => {
                throw error;    //  propagate the error upwards
            });
        }
    }

    const characterLimit = {
        altText: 100
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
                                            <div className="row row-cols-md-2 g-4">

                                                {/* START - Small Web Image */}
                                                <div className="col">
                                                    <div className={styles.uploadingBanner2}>
                                                        <h5>Upload Small Image (Web version)</h5>
                                                        <p>
                                                            Supports: PNG, JPG, JPEG (Max Size: 500KB)
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <img
                                                            src={previewSmallWebImage}
                                                            alt="small web image"
                                                            style={{width: "305px", height: "290px"}}
                                                            width={305}
                                                            height={290}
                                                            onClick={(e) => hiddenSmallWebImageFileInput.current.click()}
                                                        />
                                                        <input
                                                            type="file"
                                                            id="uploadSmallWebImage"
                                                            onChange={handleChangeSmallWebImage}
                                                            accept="image/*"
                                                            style={{display: "none"}}
                                                            ref={hiddenSmallWebImageFileInput}
                                                        ></input>
                                                        <br/>
                                                        <button
                                                            className="btn btn-danger"
                                                            style={{
                                                                border: "none",
                                                                borderRadius: "10px",
                                                                marginTop: "10px",
                                                                display: (props.data.smallWebImage.length > 0 ? "block" : "none")
                                                            }}
                                                            onClick={removeSmallWebImage}
                                                            ref={removeSmallWebImageButton}
                                                        >
                                                            Remove Image
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* END - Small Web Image */}

                                                {/* START - Big Web Image */}
                                                <div className="col" style={{marginLeft: "-5rem"}}>
                                                    <div className={styles.uploadingBanner2}>
                                                        <h5>Upload Big Image (Web Version)</h5>
                                                        <p>
                                                            Supports: PNG, JPG, JPEG (Max Size: 1MB)
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <Image
                                                            src={previewBigWebImage}
                                                            alt="big web image"
                                                            style={{width: "630px", height: "600px"}}
                                                            width={630}
                                                            height={600}
                                                            onClick={(e) => hiddenBigWebImageFileInput.current.click()}
                                                        />
                                                        <input
                                                            type="file"
                                                            id="uploadBigWebImage"
                                                            onChange={handleChangeBigWebImage}
                                                            accept="image/*"
                                                            style={{display: "none"}}
                                                            ref={hiddenBigWebImageFileInput}
                                                        ></input>
                                                        <br/>
                                                        <button
                                                            className="btn btn-danger"
                                                            style={{
                                                                border: "none",
                                                                borderRadius: "10px",
                                                                marginTop: "10px",
                                                                display: (props.data.bigWebImage.length > 0 ? "block" : "none")
                                                            }}
                                                            onClick={removeBigWebImage}
                                                            ref={removeBigWebImageButton}
                                                        >
                                                            Remove Image
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* END - Big Web Image */}

                                                {/* START - Small Mobile Image */}
                                                <div className="col">
                                                    <div className={styles.uploadingBanner2}>
                                                        <h5>Upload Small Image ( Mobile Version )</h5>
                                                        <p>
                                                            Supports : PNG, JPG, JPEG (Max Size: 200KB)
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Image
                                                            src={previewSmallMobileImage}
                                                            alt="small mobile image"
                                                            style={{width: "130px", height: "130px"}}
                                                            width={130}
                                                            height={130}
                                                            onClick={(e) => hiddenSmallMobileImageFileInput.current.click()}
                                                        />
                                                        <input
                                                            type="file"
                                                            id="uploadSmallMobileImage"
                                                            onChange={handleChangeSmallMobileImage}
                                                            accept="image/*"
                                                            style={{display: "none"}}
                                                            ref={hiddenSmallMobileImageFileInput}
                                                        ></input>
                                                        <br/>
                                                        <button
                                                            className="btn btn-danger"
                                                            style={{
                                                                border: "none",
                                                                borderRadius: "10px",
                                                                marginTop: "10px",
                                                                display: (props.data.smallMobileImage.length > 0 ? "block" : "none")
                                                            }}
                                                            onClick={removeSmallMobileImage}
                                                            ref={removeSmallMobileImageButton}
                                                        >
                                                            Remove Image
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* END - Small Mobile Image */}

                                                {/* START - Big Mobile Image */}
                                                <div style={{marginLeft: "-5rem"}} className=" col">
                                                    <div className={styles.uploadingBanner2}>
                                                        <h5>Upload Big Image ( Mobile Version )</h5>
                                                        <p>
                                                            Supports : PNG, JPG, JPEG (Max Size: 500KB)
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Image
                                                            src={previewBigMobileImage}
                                                            alt="big mobile image"
                                                            style={{width: "280px", height: "270px"}}
                                                            width={280}
                                                            height={270}
                                                            onClick={(e) => hiddenBigMobileImageFileInput.current.click()}
                                                        />
                                                        <input
                                                            type="file"
                                                            id="uploadBigMobileImage"
                                                            onChange={handleChangeBigMobileImage}
                                                            accept="image/*"
                                                            style={{display: "none"}}
                                                            ref={hiddenBigMobileImageFileInput}
                                                        ></input>
                                                        <br/>
                                                        <button
                                                            className="btn btn-danger"
                                                            style={{
                                                                border: "none",
                                                                borderRadius: "10px",
                                                                marginTop: "10px",
                                                                display: (props.data.bigMobileImage.length > 0 ? "block" : "none")
                                                            }}
                                                            onClick={removeBigMobileImage}
                                                            ref={removeBigMobileImageButton}
                                                        >
                                                            Remove Image
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* END - Big Mobile Image */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="formStartBanner selectInputForm">
                                    <h5>Category</h5>
                                    <label htmlFor="category"></label>

                                    <select required
                                            style={{
                                                width: "43rem", borderRadius: "10px", height: '3rem',
                                                fontSize: '13px',
                                                padding: '12px'
                                            }}
                                            id="category"
                                            onChange={handleChange}
                                            defaultValue={props.data.category}
                                    >
                                        <option>Select Category</option>
                                        <option>Venue</option>
                                        <option>Events</option>
                                        <option>Food</option>
                                    </select>

                                    <div className="mb-3" style={{marginTop: "2rem"}}>
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Name"
                                            className={`${styles["form-control"]}`}
                                            id="name"
                                            aria-describedby="emailHelp"
                                            defaultValue={props.data.name}
                                            onChange={handleChange}
                                        />
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

                                    <div className="mb-3" style={{marginTop: "2rem"}}>
                                        <label htmlFor="altText" className="form-label">
                                            Alt Text (accessibility performance and SEO)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter image alt text"
                                            className={`${styles["form-control"]}`}
                                            id="altText"
                                            aria-describedby="emailHelp"
                                            defaultValue={props.data.altText}
                                            maxLength={characterLimit.altText}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <span className={styles.characterEdit} ref={altTextCount}>
                                        {characterLimit.altText - props.data.altText.length}/{characterLimit.altText} Characters
                                    </span>

                                    <div className="submitButton" style={{marginTop: "7rem"}}>
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
                </div>
                <div className={styles_width.exceedScreen}>
                    <p>Screen size should be atleast 1000 pixels to access Admin Panel.</p>
                </div>
            </>
        )
    }
}
