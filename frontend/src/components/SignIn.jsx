import { useState } from "react";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

import axios from "axios";

const baseURL = "localhost:6969/";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (password === confirmPassword) signUp();
    else alert("Passwords do not match");
  }

  function signUp() {
    axios
      .post(baseURL + "/signup", {
        username: username,
        password: password,
        email: email,
        aadhar: aadhar,
        pan: pan,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <FormControl b={"1px"} id="signin">
        <FormLabel m={4}>Sign Up</FormLabel>
        <Input
          m={4}
          width="30%"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
        <Input
          m={4}
          width="30%"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Input
          m={4}
          width="30%"
          type="password"
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Input>
        <Input
          m={4}
          width="30%"
          type="text"
          placeholder="Email ID"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          m={4}
          width="30%"
          type="text"
          placeholder="Aadhar Card Number"
          onChange={(e) => setAadhar(e.target.value)}
        ></Input>
        <Input
          m={4}
          width="30%"
          type="text"
          placeholder="PAN Card Number"
          onChange={(e) => setPan(e.target.value)}
        ></Input>
        <Button w={"100%"} m={4} type="submit" onClick={onSubmit}>
          Sign Up
        </Button>
      </FormControl>
    </div>
  );
};

export default SignIn;
