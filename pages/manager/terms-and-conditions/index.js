import styles from "../../../styles/ReportsAboutEvent.module.css";
import Dashboard from "../dashboard";
import {Editor} from "@tinymce/tinymce-react";
import {useRef} from "react";
import Image from "next/image";
import dashboardImage from "../admin-images/dashboard-image.png";
import axios from "axios";

export async function getServerSideProps() {

    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/settings");
    const data = await res.json();

    //  find the terms and conditions
    let termsAndConditions = ""
    data.result.every((item) => {
        if (item.key == "terms-and-conditions" && item.value) {
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
    const editorRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios({
            url: (`/api/settings`),
            method: (`POST`),
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
                key: "terms-and-conditions",
                value: editorRef.current.getContent(),
            })
        });

        alert("saved okay")
    }

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
                            <div className={styles.ReportsHeadings}>
                                <h5>Terms & Conditions</h5>
                                <Editor
                                    onInit={(evt, editor) => (editorRef.current = editor)}
                                    apiKey="ndkwkhlm9px3ogr76hk6y07a3j1sj358aa5eglh4ticx3jst"
                                    initialValue={termsAndConditions}
                                    init={{
                                        height: 500,
                                        //menubar: true,
                                        plugins: [
                                            "advlist autolink lists link image charmap print preview anchor",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime media table paste code help wordcount",
                                        ],
                                        menubar: ["edit view insert format tools table help"],
                                        toolbar:
                                            "undo redo | formatselect | " +
                                            "bold italic backcolor | alignleft aligncenter " +
                                            "alignright alignjustify | bullist numlist outdent indent | " +
                                            "removeformat | help",
                                        content_style:
                                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                    }}
                                />
                                <div className={styles.AddLeadForm}>
                                    <button style={{border: "none"}} onClick={handleSubmit}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}