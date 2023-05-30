import axios from "axios";
import React from "react";
import {toast} from "react-toastify"
import {useState} from "react";
import Image from 'next/image'
import logo from '../Images/logo.png'
import loginmainimage from '../Images/loginmainimage.png'
import styles from "../styles/Login.module.css";

import {BsEyeSlash, BsEyeFill} from "react-icons/bs";
import {useRouter} from "next/router";
import styles_width from "../styles/AddBanner.module.css"

const Login = () => {
    const router = useRouter();
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };
//   const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        token: "",
        login: false,
    });

    const handleChange = (e) => {
        setData({...data, [e.target.id]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await axios({
                method: "POST",
                url: "/api/login",
                data: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
                headers: {"Content-Type": "application/json"},
            }).then(async (response) => {
                console.log(response)
                localStorage.setItem("loggedIn", "blablabla")

                await router.push("/manager");
            })

        } catch (error) {
            window.alert('password or username is incorrect');
            toast.error(`either username or password is incorrect${error}`)
        }
    };

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
                    {data.login === false && <form className={styles.form_container} onSubmit={handleSubmit}>
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
                                    value={data.email}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className={styles.form_style}>
                                <label htmlFor="exampleInputPassword1" style={{'color': "white"}}
                                       className="form-label">
                                    Password
                                </label>
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    name="password"
                                    className={styles.from_input}
                                    id="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder='Enter password'
                                />
                                {
                                    passwordShown === false ?

                                        <BsEyeSlash style={{"position": "relative", left:"400px","bottom":"38px"}} onClick={togglePassword}/>


                                        :
                                        <BsEyeFill style={{"position": "relative", left:"396px","bottom":"37px"}} class="far fa-eye" id="togglePassword"
                                                   onClick={togglePassword}/>

                                }

                            </div>

                        </div>
                        <button type="submit" className={styles.form_btn_container}>
                            SignIn
                        </button>

                    </form>}

                </div>
            </div>
            <div className={styles_width.exceedScreen}>
                <p>Screen size should be atleast 1000 pixels to access Admin Panel.</p>
            </div>
        </>
    );
};

export default Login;
