import * as React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";

const Suggestion = ({ categories }) => {
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    router.push(`/${categories[index]}`);
  };

  const listItems = categories.map((cate, index) => {
    return (
      <React.Fragment key={index}>
        {index !== 0 && <Divider component='li' sx={{ margin: "4px 0" }} />}
        <ListItemButton
          key={index}
          selected={selectedIndex === index}
          onClick={(event) => handleListItemClick(event, index)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "0 4px",
            fontSize: "1rem",
            height: "3.1rem",
          }}
        >
          <ListItemText
            primary={`#${cate}`}
            sx={{
              pointerEvents: "none",
              ".MuiTypography-root": {
                fontSize: "0.98rem",
                fontWeight: "600",
                lineHeight: "1",
              },
              maxHeight: "23px",
              margin: 0,
            }}
          />
          <Typography
            variant='caption'
            fontSize='12px'
            sx={{ color: "#959292", lineHeight: "1" }}
          >
            3 Posts
          </Typography>
        </ListItemButton>
      </React.Fragment>
    );
  });

  return (
    <Box
      className='row'
      sx={{
        height: "0.6",
        width: "0.8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        sx={{
          width: "1",
          // backgroundColor: "aquamarine",
        }}
      >
        <Typography
          variant='h5'
          sx={{
            fontWeight: "bolder",
            lineHeight: "1.4",
          }}
        >
          Maybe you'll like
        </Typography>
      </Stack>
      <Box sx={{ width: "100%" }}>
        <List
          component='nav'
          aria-label='Categories'
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            width: "1",
            paddingTop: "0",
            "&& .Mui-selected": {
              backgroundColor: "#2a9fe994",
            },
            "&&:not(&&.Mui-selected):hover": {
              backgroundColor: "#2a9fe994",
            },
          }}
        >
          {listItems}
        </List>
      </Box>
    </Box>
  );
};

export default Suggestion;
