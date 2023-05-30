import React, {useEffect, useState} from 'react'
import {HiTag} from 'react-icons/hi';
import {BsPencilSquare} from 'react-icons/bs';
import {BsImage} from 'react-icons/bs';
import {RiLogoutCircleFill} from 'react-icons/ri'
import {TbBellRinging} from 'react-icons/tb';
import Link from "next/link"
import Image from 'next/image';
import styles from "../../styles/Dashboard.module.css"
import {useRouter} from 'next/router';
import dashboardLogo from "./admin-images/logo1.webp";
import {signIn, signOut, useSession} from "next-auth/react";

export default function Dashboard() {
    const router = useRouter();
    const currentRoute = router.pathname;

    //  authentication here because this component is always used on admin :)
    const {status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        },
    })

    if (status === "authenticated") {
        return (
            <>
                <div style={{background: "#270F33"}} className={`${styles["col-1"]} ${styles["addEvent"]}`}>
                    <Link href="/">
                        <Image className="candleriggs" width={200} height={200} style={{'width': '200px'}}
                               src={dashboardLogo} alt=""/>
                    </Link>

                    <div className={styles.addEventLinks}>
                        <div className={styles.addeventImage}>
                            <div className={styles.lists}>
                                <HiTag className={currentRoute === "/manager/events"
                                    ? "text-warning"
                                    : (styles.listIcon)}/><Link href="/manager/events"
                                                                className={currentRoute === "/manager/events"
                                                                    ? "text-warning"
                                                                    : (styles.listIcon)}
                                                                style={{'color': "white"}}>&nbsp;&nbsp;&nbsp;&nbsp;Events </Link>
                            </div>
                            <div className={styles.lists}>
                                <BsPencilSquare className={currentRoute === "/manager/banners"
                                    ? "text-warning"
                                    : (styles.listIcon)}/><Link href="/manager/banners"
                                                                className={currentRoute === "/manager/banners"
                                                                    ? "text-warning"
                                                                    : (styles.listIcon)}
                                                                style={{'color': "white"}}>&nbsp;&nbsp;&nbsp;&nbsp;Home
                                Page
                                Banners</Link>
                            </div>
                            <div className={styles.lists}>
                                <BsPencilSquare className={currentRoute === "/manager/must-see-events"
                                    ? "text-warning"
                                    : (styles.listIcon)}/><Link href="/manager/must-see-events"
                                                                className={currentRoute === "/manager/must-see-events"
                                                                    ? "text-warning"
                                                                    : (styles.listIcon)}
                                                                style={{'color': "white"}}>&nbsp;&nbsp;&nbsp;&nbsp;Must
                                See
                                Events</Link>
                            </div>
                            <div className={styles.lists}/>
                            <BsImage className={currentRoute === "/manager/gallery"
                                ? "text-warning"
                                : (styles.listIcon)}/><Link href="/manager/gallery"
                                                            className={currentRoute === "/manager/gallery"
                                                                ? "text-warning"
                                                                : (styles.listIcon)} style={{
                            'color': "white"
                        }}>&nbsp;&nbsp;&nbsp;&nbsp;Gallery</Link>
                            <div className={styles.lists}>
                                <TbBellRinging className={currentRoute === "/manager/subscribers"
                                    ? "text-warning"
                                    : (styles.listIcon)}/><Link href="/manager/subscribers"
                                                                className={currentRoute === "/manager/subscribers"
                                                                    ? "text-warning"
                                                                    : (styles.listIcon)} style={{
                                'color': "white"
                            }}>&nbsp;&nbsp;&nbsp;&nbsp;Subscriptions</Link>
                            </div>

                            <div className={styles.lists}>
                                <BsPencilSquare className={currentRoute === "/manager/privacy-policy"
                                    ? "text-warning"
                                    : (styles.listIcon)}/><Link href="/manager/privacy-policy"
                                                                className={currentRoute === "/manager/privacy-policy"
                                                                    ? "text-warning"
                                                                    : (styles.listIcon)} style={{
                                'color': "white"
                            }}>&nbsp;&nbsp;&nbsp;&nbsp;Privacy Policy</Link>
                            </div>

                            <div className={styles.lists}>
                                <BsPencilSquare className={currentRoute === "/manager/terms-and-conditions"
                                    ? "text-warning"
                                    : (styles.listIcon)}/><Link href="/manager/terms-and-conditions"
                                                                className={currentRoute === "/manager/terms-and-conditions"
                                                                    ? "text-warning"
                                                                    : (styles.listIcon)} style={{
                                'color': "white"
                            }}>&nbsp;&nbsp;&nbsp;&nbsp;Terms & Conditions</Link>
                            </div>

                            <div className={styles.lists}>
                                <BsPencilSquare className={currentRoute === "/manager/faq"
                                    ? "text-warning"
                                    : (styles.listIcon)}/><Link href="/manager/faq"
                                                                className={currentRoute === "/manager/faq"
                                                                    ? "text-warning"
                                                                    : (styles.listIcon)} style={{
                                'color': "white"
                            }}>&nbsp;&nbsp;&nbsp;&nbsp;FAQ</Link>
                            </div>

                            <div className={styles.lists} style={{'color': "white"}}>
                                <RiLogoutCircleFill/>
                                <button style={{
                                    border: "none",
                                    background: "transparent",
                                    fontWeight: "600",
                                    letterSpacing: "0.4px",
                                    marginLeft: "-0.4rem",
                                    color: "white"
                                }} onClick={() => signOut()}>&nbsp;&nbsp;&nbsp;&nbsp;Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}