import dbConnect from "../../../utils/dbConnect";
import {serialize} from "cookie";
import Return500 from "../../../models/Return500";

//eslint-disable-next-line
export default async (req, res) => {
    try {
        await dbConnect();
        const serialized = serialize("token", "notoken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1 * 60 * 24 * 60,
            path: "/",
        });
        res.setHeader("Set-Cookie", serialized);

        return res.status(200).send({code: 200, data: "User Logged Out"});
    } catch (err) {
        return res.status(500).send(new Return500(err.toString()));
    }
};