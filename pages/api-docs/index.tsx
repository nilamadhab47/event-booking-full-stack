import dynamic from "next/dynamic";
const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false }) // Async API cannot be server-side rendered
import "swagger-ui-react/swagger-ui.css"
import swaggerJson from "./swagger.json"
import {signIn, useSession} from "next-auth/react";

export default function ApiDocs() {

    //  authentication here because we dont want everyone to see our docs
    const {status} = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        },
    })

    if (status === "authenticated") {
        return (
            <SwaggerUI spec={swaggerJson}/>
        )
    }
}