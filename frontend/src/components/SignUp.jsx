import { useState } from "react";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

import axios from "axios";

const baseURL = "localhost:6969/";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [privateId, setPrivateId] = useState("");
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
        password: password,
        email: email,
        priateId: privateId,
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
          width="47%"
          type="text"
          placeholder="Email ID"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          m={4}
          width="47%"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Input
          m={4}
          width="47%"
          type="password"
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Input>

        <Input
          m={4}
          width="47%"
          type="text"
          placeholder="Private ID"
          onChange={(e) => setPrivateId(e.target.value)}
        ></Input>
        <Button w={"97%"} m={4} type="submit" onClick={onSubmit}>
          Sign Up
        </Button>
      </FormControl>
    </div>
  );
};

export default SignUp;
