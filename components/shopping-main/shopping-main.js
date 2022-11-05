import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CenteredLoadingCircular from "../ui/CenteredLoadingCircular";
import dynamic from "next/dynamic";
import { Container } from "@mui/material";
import axios from "axios";
// import TabPanel from "../../components/shopping-main/shopping-tabs/TabPanel";
const TabPanel = dynamic(
  () => import("../../components/shopping-main/shopping-tabs/TabPanel"),
  {
    suspense: true,
  }
);

const ToolTab = dynamic(() => import("./shopping-tabs/Tools.js"), {
  suspense: true,
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Shopping = () => {
  const [value, setValue] = React.useState(0);
  const [toolProducts, setToolProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://api.bakarya.com/api/products")
      .then((data) => {
        setIsLoading(true);
        setToolProducts((prev) => data.data.slice(0, 10));
      })
      .catch((error) => alert(error));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth='xl' sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Ingredients' {...a11yProps(0)} />
          <Tab label='Baking tools' {...a11yProps(1)} />
          <Tab label='Others' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {isLoading ? (
          <ToolTab products={toolProducts} />
        ) : (
          <Box sx={{ height: "100vh", width: "1" }}>
            <CenteredLoadingCircular />
          </Box>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {isLoading ? (
          <ToolTab products={toolProducts} />
        ) : (
          <Box sx={{ height: "100vh", width: "1" }}>
            <CenteredLoadingCircular />
          </Box>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {isLoading ? (
          <ToolTab products={toolProducts} />
        ) : (
          <Box sx={{ height: "100vh", width: "1" }}>
            <CenteredLoadingCircular />
          </Box>
        )}
      </TabPanel>
    </Container>
  );
};

export default Shopping;
