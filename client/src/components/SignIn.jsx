import { useState } from "react";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

import axios from "axios";

const baseURL = "http://localhost:4000";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    //Sign In
    axios
      .post(baseURL + "/signin", {
        password: password,
        email: email,
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
        <FormLabel m={4}>Sign In</FormLabel>
        <Input
          m={4}
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          m={4}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>

        <Button w={"100%"} m={4} type="submit" onClick={onSubmit}>
          Sign In with Privacy Auth
        </Button>
      </FormControl>
    </div>
  );
};

export default SignIn;
