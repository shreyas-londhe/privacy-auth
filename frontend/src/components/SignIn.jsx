import { useState } from "react";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

import axios from "axios";

const baseURL = "localhost:6969/";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedOne, setCheckedOne] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    //sign in
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
