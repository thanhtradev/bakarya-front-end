import SideBar from "../SideBar";
import Footer from "./Footer";
import * as React from "react";
import Trends from "./Trends";
import AdList from "./AdList";
import { Box } from "@mui/material";

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
    <SideBar right={30} position='fixed' bottom='0' overflowY='scroll'>
      <Box sx={{ height: "132px", width: "1" }} />
      <Trends categories={Categories} />
      <AdList />
      <Footer />
    </SideBar>
  );
};

export default SideBarRight;
