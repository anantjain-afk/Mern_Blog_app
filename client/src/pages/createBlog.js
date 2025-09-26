import { React, useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateBlog = () => {
  const Navigate = useNavigate();
  const id = localStorage.getItem('userId')
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blogs/create-blog", {
        title: input.title,
        description: input.description,
        image: input.image,
        userId : id
      });
      if (data?.success) {
        alert("blog created");
        Navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"60%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px  10px 20px #ccc"}
          display={"flex"}
          flexDirection={"column"}
          marginTop={"30px"}
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight={"bold"}
            padding={3}
            color="gray"
          >
            Create A post
          </Typography>
          <InputLabel
            sx={{
              marginBottom: 1,
              mt: 2,
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Title
          </InputLabel>
          <TextField
            margin="normal"
            value={input.title}
            onChange={handleChange}
            name="title"
            required
          ></TextField>
          <InputLabel
            sx={{
              marginBottom: 1,
              mt: 2,
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Description
          </InputLabel>
          <TextField
            margin="normal"
            value={input.description}
            onChange={handleChange}
            name="description"
            required
          ></TextField>
          <InputLabel
            sx={{
              marginBottom: 1,
              mt: 2,
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Image URL
          </InputLabel>
          <TextField
            margin="normal"
            value={input.image}
            onChange={handleChange}
            name="image"
            required
          ></TextField>
          <Button type="submit" color="primary" variant="contained">
            submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
