import { Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";

import Navbar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
