import {MdDelete, MdFileDownload} from "react-icons/md";
import Dashboard from "../dashboard";
import Image from "next/image";
import dashboardImage from "../admin-images/dashboard-image.png";
import style from "../../../styles/ReportsAboutEvent.module.css";
import styles from "../../../styles/AddBanner.module.css";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import styles_width from "../../../styles/AddBanner.module.css"
import {signIn, useSession} from "next-auth/react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export async function getServerSideProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/subscriber");
    const data = await res.json();

    return {
        props: {
            subscribers: data.result,
        },
    };
}

export default function SubscribersList({subscribers}) {
    const router = useRouter();

    //  authentication here because this component is always used on admin :)
    const {status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        },
    })

    const [query, setQuery] = useState('');
    const searchFilter = (array) => {
        return array.filter(
            (el) => el.email.toLowerCase().includes(query)
        )
    }
    const filtered = searchFilter(subscribers)

    //Handling the input on our search bar
    const handleSearch = (e) => {
        setQuery(e.target.value)
    }

    const download = () => {
        {
            // using Java Script method to get PDF file
            fetch("/api/subscriber/export-to-csv").then(
                (response) => {
                    response.blob().then((blob) => {
                        // Creating new object of PDF file
                        const fileURL = window.URL.createObjectURL(blob);
                        // Setting various property values
                        let alink = document.createElement("a");
                        alink.href = fileURL;
                        alink.download = "EmailSubscribers";
                        alink.click();
                    });
                }
            );
        }
    };
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const handleShow = (_id) => {
        setShow(true);
        setId(_id)
    }

    async function deleteSubscription() {
        await fetch(`/api/subscriber/${id}`, {method: "DELETE"});
        await router.reload();
    }

    if (status === "authenticated") {
        return (
            <>
                <div className={style.exceedContainer}>
                    <div className="ReportContainer">
                        <div
                            className="row container"
                            style={{margin: "0px", padding: "0px"}}
                        >
                            <Dashboard/>
                            <div
                                className="ReportEventRightSide col col-sm-6 "
                                style={{marginLeft: "1.5rem"}}
                            >
                                <div
                                    className={styles.dashboardHeadings}
                                    style={{background: "#270F33"}}
                                >
                                <span
                                    className={styles.DashboardBox}
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
                                <div className={style.ReportsHeadings}>
                                <span
                                    className="subs--span"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "1.4rem",
                                    }}
                                >
                                  <h5>Subscribed Report</h5>
                                  <button
                                      className="subs--download-button"
                                      style={{
                                          position: " relative",
                                          right: "-26rem",
                                          fontFamily: "Poppins",
                                          background: "none",
                                          border: "none",
                                          fontSize: "1.1rem",
                                          fontWeight: "500",
                                      }}
                                      onClick={download}
                                  >
                                    Export Report <MdFileDownload/>
                                  </button>
                                </span>

                                    <div className="SearchAdd row">
                                        <div className="ReportSearch col-6">
                                            <input
                                                style={{
                                                    width: "65.5rem",
                                                    height: "4rem",
                                                    borderRadius: "10px",
                                                    border: "solid #dadde0"
                                                }}

                                                type="search"
                                                onChange={handleSearch}
                                                placeholder="&#128269; Search"
                                            />
                                        </div>
                                    </div>
                                    <div className={style.reportTable}>
                                        <table style={{width: "165%"}}>
                                            <tbody>
                                            <tr className={style.tableheading}>
                                                <th
                                                    colSpan="1"
                                                    style={{position: "relative", left: "35px"}}
                                                >
                                                    Email Address
                                                </th>
                                                <th colSpan="4">Subscribed date</th>

                                                <th colSpan="1">Delete</th>
                                            </tr>
                                            </tbody>
                                            {filtered.map((item, i) => (
                                                <tbody key={i}>
                                                <tr className={style.tableData}>
                                                    <td
                                                        style={{
                                                            width: "40%",
                                                            position: "relative",
                                                            left: "22px",
                                                        }}
                                                    >
                                                        {item.email}
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "30%",
                                                            position: "relative",
                                                            left: "15px",
                                                        }}
                                                    >
                                                        {item.date.slice(0, 10)}
                                                    </td>
                                                    <td>
                                                        <button
                                                            style={{width: "240%"}}
                                                        >
                                                            <MdDelete onClick={() => handleShow(item._id)}/>
                                                        </button>
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
                                    Are you sure you want to delete this Subscriber ? {" "}
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
                            onClick={deleteSubscription}

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