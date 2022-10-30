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

  React.useEffect(() => {
    fetchProducts();
    console.log("i ran once");
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://api.bakarya.com/api/products");

      if (res.status !== 200) {
        throw new Error(" Something went wrong :( ");
      }

      setToolProducts(res.data.slice(0, 9));
    } catch (err) {
      alert(err);
    }
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
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        <React.Suspense fallback={<CenteredLoadingCircular />}>
          <ToolTab products={toolProducts} />
        </React.Suspense>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Container>
  );
};

export default Shopping;
