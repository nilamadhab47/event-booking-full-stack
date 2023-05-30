import React, { useState } from "react";
import styles from "../styles/faq.module.css";
import parse from "html-react-parser";

const Accordion = ({ question, answer }) => {
  const [isActive, setIsActive] = useState(false);
  

  return (
    <div className={styles.faq_section_four}>
      <div className={styles.faq_section_div}>
       
          <div className={styles.faq_section_item}>
            <div className={styles.accordian_question_div} style={{display:"flex"}} onClick={() => setIsActive(!isActive)}>
              
              <span>{question}</span>
              <div>{isActive ? "-" : "+"}</div>
            </div>

            <br />
            {isActive && 
            <div>
                {parse(answer)}
                </div>}
          </div>
      
      </div>
    </div>
  );
};

export default Accordion;