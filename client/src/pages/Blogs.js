import { React, useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/blogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  // getting all blogs of user
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("api/v1/blogs/all-blogs");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  // console.log(blogs);
  return (
    <>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.userId?.username}
            time={blog.createdAt}
          />
        ))}
    </>
  );
};

export default Blogs;
