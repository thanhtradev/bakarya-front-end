import React from "react";
import "../styles/globals.css";
import { AuthContextProvider } from "../store/auth-context";
import HeaderNewFeed from "../components/header/header-new-feed/header";
import { Box } from "@mui/material";
const ProgressBar = dynamic(() => import("../components/ui/ProgressBar"), {
  ssr: false,
});
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Box
        sx={{
          width: "1",
          height: "57px",
        }}
      >
        <HeaderNewFeed />
        <ProgressBar />
      </Box>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
