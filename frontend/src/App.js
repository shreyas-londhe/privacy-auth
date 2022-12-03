import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Aadhar from "./pages/Aadhar";
import PANCard from "./pages/PAN";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/aadhar" element={<Aadhar />} />
          <Route exact path="/pancard" element={<PANCard />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
