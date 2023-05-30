import React, { useEffect } from "react";
import Router from "next/router";

export default function Index() {
  useEffect(() => {
    const {pathname} = Router
    //  redirect in case we go for index
    if (pathname == '/manager') {
      Router.push("/manager/events");
    }
  });

  return (<></>)
}