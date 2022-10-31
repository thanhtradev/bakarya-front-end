import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Suspense } from "react";

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <Suspense fallback={`Loading...`}>
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    </Suspense>
  );
}
