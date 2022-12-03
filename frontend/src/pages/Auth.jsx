import React from "react";
import { Box } from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";

function Auth() {
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
        <SignIn />
      </div>
    </Box>
  );
}

export default Auth;
