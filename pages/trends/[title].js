import { useRouter } from "next/router";
import React from "react";
import SideBarLeft from "../../components/body-feed/side-bar/side-bar-left/SideBarLeft";
import SideBarRight from "../../components/body-feed/side-bar/side-bar-right/SideBarRight";

export default function TrendPage() {
  const router = useRouter();
  const { title } = router.query;
  console.log(title);

  return (
    <React.Fragment>
      <h1 style={{ textTransform: "capitalize" }}>{title}</h1>
    </React.Fragment>
  );
}
