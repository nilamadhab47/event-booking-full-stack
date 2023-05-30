import {getCsrfToken} from "next-auth/react"
import styles from "../../styles/Login.module.css";
import React from "react";
import Image from "next/image";
import loginmainimage from "../../Images/loginmainimage.png";
import logo from "../../Images/logo.png";
import {BsEyeFill, BsEyeSlash} from "react-icons/bs";

export default function SignIn({ csrfToken }) {

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     await signIn("credentials", {
    //         email: event.target.email.value,
    //         password: event.target.password.value
    //     })
    // }

    return (
        <>
            <div className={styles.logincontainer}>
                <div className="login_image_container">
                    <Image

                        src={loginmainimage}
                        alt="Picture of the author"
                        className={styles.login_image_left}
                        width={500}
                        height={100}

                    />
                </div>
                <div className={styles.login_form}>

                        <form method="post" action="/api/auth/callback/credentials" className={styles.form_container}>
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <Image

                            src={logo}
                            alt="Picture of the author"
                            width={200}
                            height={200}
                            className={styles.login_logo}
                        />

                        <h2 className={styles.form_h2} style={{'color': "white", 'fontFamily': "Poppins"}}>Welcome
                            Back!</h2>
                        <div className={styles.form_style_container}>

                            <div className={styles.form_style}>
                                <label htmlFor="exampleInputEmail1" style={{'color': "white"}} className="form-label">
                                    Email or Username
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className={styles.from_input}
                                    id="email"
                                    placeholder="Enter Email or Username"
                                    aria-describedby="emailHelp"
                                />
                            </div>
                            <div className={styles.form_style}>
                                <label htmlFor="exampleInputPassword1" style={{'color': "white"}}
                                       className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className={styles.from_input}
                                    id="password"
                                    placeholder='Enter password'
                                />
                            </div>

                        </div>
                        <button type="submit" className={styles.form_btn_container}>
                            SignIn
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}