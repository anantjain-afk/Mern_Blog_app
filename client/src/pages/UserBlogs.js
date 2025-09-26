import { React, useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/blogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const { data } = await axios.get(
        `api/v1/blogs/userBlogs/${localStorage.getItem("userId")}`
      );
      if (data?.success) {
        setBlogs(data?.userAndBlogs.blogs);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);

  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.userId?.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You haven't created any blog</h1>
      )}
    </>
  );
};

export default UserBlogs;
