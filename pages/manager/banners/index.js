import {MdDelete} from "react-icons/md";
import {HiPencil} from "react-icons/hi";
import {AiOutlinePlus} from "react-icons/ai";
import Link from "next/link";
import {useEffect, useState} from "react";
import Dashboard from "../dashboard";
import dayjs from "dayjs";
import styles from "../../../styles/AddBanner.module.css"
import style from "../../../styles/ReportsAboutEvent.module.css"
import Image from "next/image";
import {useRouter} from "next/router";
import styles_width from "../../../styles/AddBanner.module.css"

import dashboardImage from "../admin-images/dashboard-image.png";
import {signIn, useSession} from "next-auth/react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export async function getServerSideProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/banner");
    const data = await res.json();

    return {
        props: {
            banners: data.result,
        },
    };
}

export default function BannersList({banners}) {
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
            (el) => el.name.toLowerCase().includes(query)
        )
    }
    const filtered = searchFilter(banners)

    //Handling the input on our search bar
    const handleSearch = (e) => {
        setQuery(e.target.value)
    }
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const handleShow = (_id) => {
        setShow(true);
        setId(_id)
    }

    async function deleteBanner() {

        //  delete its desktopImage
        await fetch(`/api/banner/upload-desktop-image/${id}`, {method: "DELETE"});
        //  delete its mobileImage
        await fetch(`/api/banner/upload-mobile-image/${id}`, {method: "DELETE"});
        //  delete banner
        await fetch(`/api/banner/${id}`, {method: "DELETE"});

        await router.reload();
    }

    if (status === "authenticated") {
        return (
            <>
                <div className={styles.exceedContainer}>
                    <div className="ReportContainer ">
                        <div className="row container" style={{margin: "0px", padding: "0px"}}>
                            <Dashboard/>
                            <div className="ReportEventRightSide col col-sm-6 " style={{marginLeft: "1.5rem"}}>
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
                                    <h5>Home page Banners</h5>
                                    <div className={style.SearchAdd} style={{display: "flex"}}>
                                        <div className={style.ReportSearch}>
                                            <input
                                                type="search" style={{
                                                width: "52.5rem",
                                                height: "4rem",
                                                borderRadius: "10px",
                                                border: "solid #dadde0"
                                            }}
                                                onChange={handleSearch}
                                                placeholder="&#128269; Search"
                                            />
                                        </div>
                                        <div className={style.AddLeadForm}>
                                            <Link href="/manager/banners/0">
                                                <button style={{border: "none"}}>
                                                    Add Banner <AiOutlinePlus className="leadIcon"/>{" "}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={style.reportTable}>
                                        <table>
                                            <tbody>
                                            <tr className={style.tableheading}>
                                                <th colSpan="1">Banner Name</th>
                                                <th colSpan="1">Listing From</th>
                                                <th colSpan="1">Listing To</th>
                                                <th colSpan="1">Edit</th>
                                                <th colSpan="1">Delete</th>
                                            </tr>
                                            </tbody>
                                            {filtered.map((item, i) => (
                                                    <tbody key={i}>
                                                    <tr className={style.tableData}>
                                                        <td>{item.name}</td>
                                                        <td>{dayjs(item.startDate).format("MMM D YYYY")}</td>
                                                        <td>{dayjs(item.endDate).format("MMM D YYYY")}</td>
                                                        <td>
                                                            <Link href={`/manager/banners/${item._id}`}>
                                                                <button style={{marginLeft: "9px"}}>
                                                                    <HiPencil/>
                                                                </button>
                                                            </Link>
                                                        </td>
                                                        {/* onClick={() => deleteBanner(item._id)} */}
                                                        <td>
                                                            <button style={{marginLeft: "12px"}}
                                                            >
                                                                <MdDelete onClick={() => handleShow(item._id)}/>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                )
                                            )}
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
                                    Are you sure you want to delete this Banner ? {" "}
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
                            onClick={deleteBanner}
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