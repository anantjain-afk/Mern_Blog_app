import { React, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      const { data } = await axios.post("/api/v1/users/register", {
        username: input.name,
        email: input.email,
        password: input.password,
      });
      if (data.success) {
        alert("User Registered successfully");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
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
            Register
          </Typography>
          <TextField
            placeholder="name"
            value={input.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            required
            type="text"
          ></TextField>
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
            onClick={() => navigate("/login")}
          >
            Already Register ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
