import React from "react";
import { Box } from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";

function Home() {
  return (
    <Box>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <SignUp />
      </div>
    </Box>
  );
}

export default Home;
