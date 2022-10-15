import SideBar from "../SideBar";
import * as React from "react";
import Trends from "./Trends";
import AdList from "./AdList";

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
      <Trends categories={Categories} />
      <AdList />
    </SideBar>
  );
};

export default SideBarRight;
