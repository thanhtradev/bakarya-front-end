import SideBar from "./SideBar";
import * as React from "react";
import Suggestion from "./Suggestion";

const Categories = [
  "Birthday cake",
  "Bread",
  "Biscuit",
  "Mini Cake",
  "Cookie",
  "Crepe",
  "Pastry",
];

const SideBarRight = () => {
  return (
    <SideBar right={30}>
      <Suggestion categories={Categories} />
    </SideBar>
  );
};

export default SideBarRight;
