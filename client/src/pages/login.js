import { React, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/store";
function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  //handle input change
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/users/login", {
        email: input.email,
        password: input.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authAction.login());
        alert("User Login successfully");

        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("user not registered");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign={"center"}
          >
            Login
          </Typography>

          <TextField
            placeholder="email"
            value={input.email}
            onChange={handleChange}
            name="email"
            required
            margin="normal"
            type="email"
          ></TextField>
          <TextField
            placeholder="password"
            value={input.password}
            onChange={handleChange}
            name="password"
            required
            margin="normal"
            type="password"
          ></TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 2 }}
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 2 }}
            onClick={() => navigate("/register")}
          >
            Not Registered ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Login;
