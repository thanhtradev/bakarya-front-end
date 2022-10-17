import { Box } from "@mui/material";
import SideBar from "../SideBar";
import Navigation from "./Navigation";
import Top10Posts from "./TopPost";
const SideBarLeft = ({ top10Posts }) => {
  return (
    <SideBar left={30} position='fixed' bottom='0' overflowY='scroll'>
      <Box>
        <Navigation />
        <Top10Posts top10Posts={top10Posts} />
      </Box>
    </SideBar>
  );
};

export default SideBarLeft;
