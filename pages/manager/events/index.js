import React, {useEffect, useRef} from "react";
import {MdDelete} from "react-icons/md";
import {AiOutlinePlus} from "react-icons/ai";
import Link from "next/link";
import {useState} from "react";
import Dashboard from "../dashboard";
import {MdEdit} from "react-icons/md";
import {BiDuplicate} from "react-icons/bi";
import dayjs from "dayjs";
import Image from "next/image";
import dashboardImage from "../admin-images/dashboard-image.png";
import styling from "../../../styles/ReportsAboutEvent.module.css"
import {useRouter} from "next/router";
import SEOIcons from "../../../component/events-seo-icons.jsx";
import styles_width from "../../../styles/AddBanner.module.css"
import {signIn, useSession} from "next-auth/react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export async function getServerSideProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/event");
    const data = await res.json();

    const resSettings = await fetch(process.env.NEXT_PUBLIC_URL + "/api/settings");
    const dataSettings = await resSettings.json();

    return {
        props: {
            events: data.result,
            settings: dataSettings.result,
        },
    };
}

export default function EventsList({events, settings}) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [togglebtn, setToggleBtn] = useState(false);

    //  authentication here because this component is always used on admin :)
    const {status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        },
    })

    const searchFilter = (array) => {
        return array.filter(
            (el) => el.name.toLowerCase().includes(query)
        )
    }
    const filtered = searchFilter(events)

    const styles = {
        background: {
            color: "#9E9D9D",
        },
        backgroundColor: {
            color: "black",
        },
        displayEvent: {
            display: "none",
        },
    };
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    const pastDate = dayjs(yesterday).format();
    const goneDate = new Date(pastDate);

    //Handling the input on our search bar
    const handleSearch = (e) => {
        setQuery(e.target.value)
    }

    const showOldEvent = () => {
        if (togglebtn == false) {
            setToggleBtn(true);
        } else {
            setToggleBtn(false);
        }
    };

    async function duplicateEvent(eventId) {
        await fetch(`/api/event/duplicate/${eventId}`, {method: "GET"}).then(async (response) => {
            console.log(await response.json());
        });
        await router.reload();
    };
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const handleShow = (_id) => {
        setShow(true);
        setId(_id)
    }

    async function deleteEvent() {

        //  delete its desktopImage
        await fetch(`/api/event/upload-desktop-image/${id}`, {method: "DELETE"}).then(async (response) => {
            console.log(await response.json());
        });
        //  delete its mobileImage
        await fetch(`/api/event/upload-mobile-image/${id}`, {method: "DELETE"}).then(async (response) => {
            console.log(await response.json());
        });
        //  delete event
        await fetch(`/api/event/${id}`, {method: "DELETE"}).then(async (response) => {
            console.log(await response.json());
        });
        await router.reload();
    }

    if (status === "authenticated") {
        return (
            <>
                <div className={styling.exceedContainer}>
                    <div className="ReportContainer ">
                        <div
                            className="row container"
                            style={{margin: "0px", padding: "0px"}}
                        >
                            <Dashboard settings={settings}/>

                            <div
                                className="ReportEventRightSide col col-sm-6 "
                                style={{marginLeft: "1.5rem"}}>
                                {/*<p style={{textAlign: "right", color: "red"}}>{settings.environment}</p>*/}
                                <div
                                    className={styling.dashboardHeadings}
                                    style={{background: "#270F33"}}
                                >
                                <span
                                    className={styling.DashboardBox}
                                    style={{display: "flex"}}
                                >
                                  <Image
                                      src={dashboardImage}
                                      style={{width: "20px", height: "22px", marginTop: "8px"}}
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
                                <div className={styling.ReportsHeadings}>
                                    <h5>Events</h5>
                                    <div className={styling.SearchAdd} style={{display: "flex"}}>
                                        <div className={styling.ReportSearch}>
                                            <input
                                                type="search"
                                                style={{
                                                    width: "52.5rem",
                                                    height: "4rem",
                                                    borderRadius: "10px",
                                                    border: "solid #dadde0",
                                                }}
                                                placeholder="&#128269; Search"
                                                onChange={handleSearch}
                                            />
                                        </div>
                                        <div className={styling.AddLeadForm}>
                                            <Link href="/manager/events/0">
                                                {" "}
                                                <button style={{border: "none"}}>
                                                    Add Event <AiOutlinePlus className="leadIcon"/>{" "}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div
                                        className="form-check form-switch" style={{
                                        marginLeft: "54.4rem",
                                        width: "11rem",
                                        marginTop: "2rem"
                                    }}
                                    >
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexSwitchCheckDefault"
                                            style={{position: "relative", right: "3rem"}}
                                        >
                                            Show Past Events
                                        </label>
                                        <input
                                            className="form-check-input"
                                            onChange={showOldEvent}
                                            type="checkbox"
                                            role="switch" style={{position: "absolute"}}
                                            id="flexSwitchCheckDefault"
                                        />


                                    </div>
                                    <div className={styling.reportTable}>
                                        <table>
                                            <tbody>
                                            <tr className={styling.tableheading}>
                                                <th colSpan="1">Event Name</th>
                                                <th colSpan="1">Price</th>
                                                <th colSpan="1">Listing Start Date</th>
                                                <th colSpan="1">Event Date</th>
                                                <th colSpan="1">Edit</th>
                                                <th colSpan="1">Delete</th>
                                                <th colSpan="1">Duplicate</th>
                                                <th colSpan="1">SEO</th>
                                            </tr>
                                            </tbody>
                                            {filtered.map((item, i) => (
                                                <tbody key={i}>
                                                <tr
                                                    style={
                                                        togglebtn === false
                                                            ? goneDate > new Date(item.eventDate)
                                                                ? styles.displayEvent
                                                                : styles.backgroundColor
                                                            : styles.backgroundColor
                                                    }

                                                >
                                                    <td className={styling.tabledata_data}
                                                        style={
                                                            togglebtn === true &&
                                                            goneDate > new Date(item.eventDate)
                                                                ? styles.background
                                                                : styles.backgroundColor
                                                        }
                                                    >
                                                        {item.name}
                                                    </td>
                                                    <td className={styling.tabledata_data}
                                                        style={
                                                            togglebtn === true &&
                                                            goneDate > new Date(item.eventDate)
                                                                ? styles.background
                                                                : styles.backgroundColor
                                                        }
                                                    >
                                                        £{item.price}
                                                    </td>
                                                    <td className={styling.tabledata_data}
                                                        style={
                                                            togglebtn === true &&
                                                            goneDate > new Date(item.eventDate)
                                                                ? styles.background
                                                                : styles.backgroundColor
                                                        }
                                                    >
                                                        {item.displayEventListingFrom}
                                                    </td>
                                                    <td className={styling.tabledata_data}
                                                        style={
                                                            togglebtn === true &&
                                                            goneDate > new Date(item.eventDate)
                                                                ? styles.background
                                                                : styles.backgroundColor
                                                        }
                                                    >
                                                        {item.eventDate}
                                                    </td>
                                                    <td className={styling.tabledata_data}>
                                                        <Link href={`/manager/events/${item._id}`}>
                                                            <button className={styling.editButton} style={
                                                                togglebtn === true &&
                                                                goneDate > new Date(item.eventDate)
                                                                    ? styles.background
                                                                    : styles.backgroundColor
                                                            }
                                                            >
                                                                <MdEdit/>
                                                            </button>
                                                        </Link>
                                                    </td>
                                                    <td className={styling.tabledata_data}
                                                        style={
                                                            togglebtn === true &&
                                                            goneDate > new Date(item.eventDate)
                                                                ? styles.background
                                                                : styles.backgroundColor
                                                        }

                                                    >
                                                        <MdDelete className="mdDelete"
                                                                  onClick={() => handleShow(item._id)}
                                                                  style={{cursor: "pointer"}}/>
                                                    </td>
                                                    <td className={styling.tabledata_data}>
                                                        <BiDuplicate
                                                            onClick={() => duplicateEvent(item._id)}
                                                            style={
                                                                togglebtn === true &&
                                                                goneDate > new Date(item.eventDate)
                                                                    ? styles.background
                                                                    : styles.backgroundColor
                                                            }
                                                        />
                                                    </td>
                                                    <td className={styling.tabledata_data}>
                                                        <SEOIcons
                                                            state={item.seoTitle.length > 1 && item.seoDescription.length > 1}/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            ))}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={show}
                    style={{marginTop: "10rem"}}
                    onHide={handleClose}
                >
                    <Modal.Body>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label style={{"marginLeft": "2rem"}}>
                                    Are you sure you want to delete this Event ? {" "}
                                    {" "}
                                </Form.Label>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="warning"
                            size="xxl"
                            style={{
                                position: "relative",
                                right: "134px",
                                padding: "14px 49px",
                            }}
                            onClick={deleteEvent}
                        >
                            Delete
                        </Button>
                        <Button
                            style={{
                                color: "black",
                                backgroundColor: "white",
                                border: "1px solid black",
                                padding: "14px 49px",
                            }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className={styles_width.exceedScreen}>
                    <p>Screen size should be atleast 1000 pixels to access Admin Panel.</p>
                </div>
            </>
        )
    }
}