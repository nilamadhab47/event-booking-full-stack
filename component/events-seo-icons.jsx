import {AiFillCheckSquare} from "react-icons/ai";
import {MdIndeterminateCheckBox} from "react-icons/md";

export default function SEOIcons({state}) {
    return (
        <>
            {state && <AiFillCheckSquare style={{color: "green"}} />}
            {!state && <MdIndeterminateCheckBox />}
        </>
    )
}