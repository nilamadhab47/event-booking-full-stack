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

    //  find the termsAndConditions
    let termsAndConditions = ""
    data.result.every((item) => {
        if (item.key == "terms-and-conditions") {
            termsAndConditions = item.value
        }
        return true;
    });

    return {
        props: {
            termsAndConditions: termsAndConditions,
        },
    };
}

export default function TermsAndConditions({termsAndConditions}) {
    const router = useRouter();
    const canonicalLink = process.env.NEXT_PUBLIC_URL + router.pathname;

    const Navbar = dynamic(() => import("../../component/navbar"), {
        suspense: true
    });

    return (
        <>
            <NextSeo
                title="Terms &amp; Conditions - 18 Candleriggs | Events Venue Glasgow"
                description="Terms &amp; Conditions - 18 Candleriggs | Events Venue Glasgow"
                canonical={canonicalLink}
            />
            <Suspense fallback={<div className="loading-lazy">loading....</div>}>
                <Navbar />
            </Suspense>
            <div className={styles.container}>
                <div style={{marginTop: "3rem", padding: "0 85px 0 85px"}}>
                    {parse(termsAndConditions)}

                    {/*<h1 className={styles.menu_heading1}>Terms &amp; Conditions</h1>*/}

                    {/*<p>The term &quot;<b>18 Candleriggs</b>&quot; or &quot;us&quot; or &quot;we&quot; refers to the owner of the website, The <b>18 Candleriggs</b> venue, whose registered office is at 18 Candleriggs, Glasgow, G1 1LD, UK. The term &quot;you&quot; refers to the user or viewer of our website. The use of this website is subject to the following terms of use:</p>*/}
                    {/*<p>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>*/}
                    {/*<p>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</p>*/}
                    {/*<p>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.</p>*/}
                    {/*<p>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</p>*/}
                    {/*<p>All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website. Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</p>*/}
                    {/*<p>From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</p>*/}
                    {/*<p>You may not create a link to this website from another website or document without <b>18 Candleriggs</b> venue’s prior written consent.</p>*/}
                    {/*<p>Your use of this website and any dispute arising out of such use of the website is subject to the laws of England, Scotland, and Wales.</p>*/}
                    {/*<p><b>18 Candleriggs</b> Copyright Notice:</p>*/}
                    {/*<p>This website and its content is copyrighted of &quot;<b>18 Candleriggs</b>&quot;. All rights reserved.</p>*/}
                    {/*<p>Any redistribution or reproduction of part or all the contents in any form is prohibited other than the following:</p>*/}
                    {/*<p>You may print or download to local hard disk extracts for your personal and non-commercial use only.</p>*/}
                    {/*<p>You may copy the content to individual third parties for their personal use, but only if you acknowledge the website as the source of the material.</p>*/}

                    {/*<p>You may not, except with our express written permission, distribute or commercially exploit the content. Nor may you transmit it or store it on any other website or another form of the electronic retrieval system.</p>*/}
                    {/*<p>The information contained on this website is for general information purposes only. The information is provided by &quot;<b>18 Candleriggs</b>&quot; and whilst we endeavour to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>*/}
                    {/*<p>In no event will we be liable for any loss or damage, including, without limitation, indirect or consequential loss or damage, loss of data or profits or any loss or damage whatsoever, arising out of or in connection with the use of this website. We do not exclude liability for personal injury or death resulting from our negligence or any liability that it would be illegal to exclude or attempt to exclude.</p>*/}
                    {/*<p>Through this website, you are able to link to other websites which are not under the control of &quot;<b>18 Candleriggs</b>&quot;. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>*/}
                    {/*<p>Every effort is made to keep the website up and running smoothly. However, &quot;<b>18 Candleriggs</b>&quot; takes no responsibility for and will not be liable for the website being temporarily unavailable due to technical issues beyond our control.</p>*/}
                    {/*<h2>DEPOSITS/FULL BALANCE T&CS</h2>*/}
                    {/*<p>All monies received as a deposit payment toward a future reservation or event are subject to our company terms & conditions; any reservation cancelled 14 days prior to the date of the event will receive a full deposit refund. If cancellation occurs less than 14 days prior to the reservation date all monies paid will be non-refundable and are also non-transferable.</p>*/}
                    {/*<p>Please note the above T&Cs are not applicable for all reservations from November 25th to December 31st. All reservations during the festive period are non-refundable and non-transferable.</p>*/}
                    {/*<p>Wedding and private events may have separate terms and conditions which can be found on the venue’s website.</p>*/}
                    {/*<p><b>Minimum spends</b>: all minimum spends are to be arranged prior to your event. all prices are inclusive of VAT. if you and your guests do not make the minimum spend, you will be asked to pay the difference up to the agreed minimum spend.</p>*/}
                    {/*<p><b>Severe Weather Policy</b>: In the event of a venue being unable to open due to severe weather, bookers will be contacted by individual venues to offer rescheduled dates within the subsequent ten days. Dates are subject to availability. All other cancellations are bound by our standard terms and conditions. All guests must be available to be seated at the arranged time of booking. Failure to do so will result in loss of bookings and deposit paid.</p>*/}
                    {/*<h2>SERVICE CHARGE</h2>*/}
                    {/*<p>Here at <b>18 Candleriggs</b>, we as a team promise to deliver exceptional service for you and your friends, and we hope you agree. With that in mind, a 10% discretionary service charge will be applied to your final balance. We can assure you that this full amount will be distributed evenly among all our employees who helped make your event a memorable one.</p>*/}
                    {/*<h2>ALLERGENS</h2>*/}
                    {/*<p>For our guests with food sensitivities, allergies, or special dietary needs: We prepare and serve products that contain all 14 major allergens. Although we and our suppliers take every care in preparing your meal, regular kitchen operations across our supply chain involve shared cooking and preparation areas, and food variations may occur due to ingredient substitutions, recipe revisions, and/or preparation at the restaurant. For these reasons, we cannot guarantee that any menu item will be completely free of allergens. If you have an allergy, please make this known to a venue manager at soon as you arrive at the venue.</p>*/}
                    {/*<h2>CHALLENGE 25</h2>*/}
                    {/*<p>All of our venues hold a challenge 25 policy. This means staff hold the right to request identification from those who look under the age of 25 – this is for purchases of alcohol or any item that has a legal age requirement. Service is refused if you cannot show one of the following: Passport, driver’s License or Scottish Pass Age Verification.</p>*/}
                </div>
            </div>
            <Footer/>

        </>
    )
}