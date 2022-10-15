import SideBar from "../SideBar";
import Footer from "./Footer";
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
    <SideBar right={30} position='sticky' stickyTop='-20%'>
      <Trends categories={Categories} />
      <AdList />
      <Footer />
    </SideBar>
  );
};

export default SideBarRight;
