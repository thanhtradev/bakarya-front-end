import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Navigation from "./Navigation";
import Top10Posts from "./TopPost";
import axios from "axios";
import CenteredLoadingCircular from "../../../ui/CenteredLoadingCircular";

const SideBarLeft = () => {
  const [top10Posts, setTop10Post] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchTop10Post();
  }, []);

  const fetchTop10Post = async () => {
    try {
      setIsLoading(true);
      const top10PostURL = "http://api.bakarya.com/api/recipes/top10";
      const top10PostData = await axios.get(top10PostURL);

      setTop10Post(() => top10PostData.data);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  return (
    <SideBar left={30} position='fixed' bottom='0' overflowY='scroll'>
      <Box>
        <Navigation />
        {/* {isLoading && <CenteredLoadingCircular />} */}
        <Top10Posts top10Posts={top10Posts} />
      </Box>
    </SideBar>
  );
};

export default SideBarLeft;
