import {NextSeo} from "next-seo";
import React, {Suspense} from "react";
import styles from "./style.module.css";
import Footer from "../../component/footer";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import parse from "html-react-parser";

export async function getServerSideProps() {

    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/settings");
    const data = await res.json();

    //  find the privacyPolicy
    let privacyPolicy = ""
    data.result.every((item) => {
        if (item.key == "privacy-policy") {
            privacyPolicy = item.value
        }
        return true;
    });

    return {
        props: {
            privacyPolicy: privacyPolicy,
        },
    };
}

export default function PrivacyPolicy({privacyPolicy}) {
    const router = useRouter();
    const canonicalLink = process.env.NEXT_PUBLIC_URL + router.pathname;

    const Navbar = dynamic(() => import("../../component/navbar"), {
        suspense: true
    });

    return (
        <>
            <NextSeo
                title="Privacy Policy - 18 Candleriggs | Events Venue Glasgow"
                description="Privacy Policy - 18 Candleriggs | Events Venue Glasgow"
                canonical={canonicalLink}
            />
            <Suspense fallback={<div className="loading-lazy">loading....</div>}>
                <Navbar />
            </Suspense>
            <div className={styles.container}>
                <div style={{marginTop: "3rem", padding: "0 85px 0 85px"}}>
                    {parse(privacyPolicy)}

                    {/*<h1 className={styles.menu_heading1}>Privacy Policy</h1>*/}

                    {/*<p><b>18 Candleriggs</b> is committed to ensuring that your privacy is protected. This privacy policy explains how we use the information we collect about you and the procedures we have in place to safeguard your privacy.</p>*/}
                    {/*<p><b>18 Candleriggs</b> may collect information about you through our websites, including information you submit to our websites (such as online booking forms), and information collected by web logs (which monitor site traffic and use) or by cookies. 18 Candleriggs may also collect information about you by other means, including information you provide over the phone, in person, by e-mail, through our social media platforms, through any apps we make available and by way of our CCTV systems. The information we collect may include sensitive personal information; for instance, to provide the best service possible, we may collect and store information about any disability you have.</p>*/}
                    {/*<p>We may use information collected about you to process your orders for products and services, to ensure that the content of our websites is presented to you in an effective manner, to analyse user activity of our websites and products, to provide you with information you have requested from us, to send you marketing information about products and services we think you may be interested in, to administer and maintain our records, for the purposes of crime detection and prevention, and for other reasonable purposes.</p>*/}
                    {/*<p><b>18 Candleriggs</b> will only collect and process information about you if at least one of the following points applies:</p>*/}
                    {/*<ul>*/}
                    {/*    <li>you have consented to us collecting and processing your information (for example, you have ticked a box to receive e-mail newsletters);</li>*/}
                    {/*    <li>we need the information in order to comply with a contractual obligation (for example, we may hold your name and contact details in order to maintain a reservation you have made with us);</li>*/}
                    {/*    <li>we have a legitimate interest to collect and process the information in a way which might be reasonably expected as part of running a business and which does not significantly impact n your rights (for example, the operation of CCTV to facilitate crime detection and prevention on our premises or the use of your contact details to provide you with information about products and services we think may be of interest to you); or</li>*/}
                    {/*    <li>we are legally obliged to collect and process the information (for example, if it is necessary to comply with the legal requirements contained in a liquor licence).</li>*/}
                    {/*</ul>*/}
                    {/*<p><b>18 Candleriggs</b> may pass the information we hold about you to any contractor or promoter we appoint to provide services to us, to any prospective buyer of our business, to our professional advisers or to other third parties where the law requires or permits us to do so. Otherwise, we will not share your information with third parties unless you authorise us to do so.</p>*/}
                    {/*<p><b>18 Candleriggs</b> may retain such information for as long as we reasonably require but will not retain it for any longer than is legally permitted. If you are aware of any inaccuracy in the information we hold about you, please inform us. You have certain legal rights in respect of the information we hold about you. You are entitled to have access to the information and to insist that we cease using it for particular purposes or, in some cases, that we delete it altogether. If you would like to discuss this further, please contact us via the contact details on this website. When you fail to provide information to us or ask that we stop using your information, that may impact the services we are able to provide to you.</p>*/}
                    {/*<p><b>18 Candleriggs</b> may use cookies, tracking tools and similar technologies on our websites. A cookie is a file that is placed on your computer or another internet-enabled device by a web page. Usually, cookies will be automatically enabled but you can set your web browser to disable them. If you wish to limit the cookies allowed by your computer, the help button on your web browser will normally give you details on how to achieve this. If you choose to limit or disable cookies, you may not be able to benefit from all the features of our websites.</p>*/}
                    {/*<p>Where we have a presence on third-party social media sites, you should be aware that these third-party sites will have their own privacy policies and terms and conditions. We recommend that you read these policies.</p>*/}
                    {/*<p>If you are given login details, passwords, or the like for our websites, you must keep these confidential and not disclose these to any third parties.</p>*/}
                    {/*<p>The internet is not a secure medium, but we maintain industry-standard security measures on our websites and systems, and we regularly review these measures to ensure they remain up-to-date. Although we will do our best to protect your personal information, we cannot guarantee the security of your information transmitted online or through our websites. Transmission of the information is at your own risk. We accept no liability if our electronic security is breached.</p>*/}
                    {/*<p>By submitting your information to us on our websites www.18candleriggs.com or by other means, you consent to the use of that information as set out in this privacy policy. Due to the international nature of the internet and e-commerce, we may transfer the information you provide to companies outside the European Economic Area (EEA). <b>18 Candleriggs</b> will keep any transfers outside the EEA to the minimum practicable and will ensure that the same level of protection is applied to your information as would be the case if it remained within the EEA.</p>*/}
                    {/*<p>If you have any queries about the way your information is dealt with, please contact us via the contact details on our website. If you are unhappy with our response, you have the right to lodge a complaint with the Information Commissioner’s Office, which you can do by visiting <a href={"https://www.ico.org.uk/concerns"} target={"_blank"} style={{textDecoration: "underline"}} rel="noreferrer">www.ico.org.uk/concerns</a>.</p>*/}
                    {/*<p><b>18 Candleriggs</b> reserves the right to amend or replace this privacy policy at any time. Your continued use of the websites and our services will be considered acceptance of the privacy policy in place at the relevant time.</p>*/}
                    {/*<p align={"right"}>Last modified – January 2023</p>*/}
                </div>
            </div>
            <Footer/>

        </>
    )
}