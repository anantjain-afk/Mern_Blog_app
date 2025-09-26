import { React, useState } from "react";
import {
  Box,    //box of material Ui is same as div 
  AppBar, //Appbar is the main container for navbar or haider its the blue navbar directly
  Toolbar, //its the helper component that goes inside appbar its make all the content horizontal apply some standard paddign 
  Button, //
  Typography, //in MUI instead of p , h1, h2 we use typography 
  Tabs, //this is the parent component that manages and groups the tabs
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import {authAction} from '../redux/store'
function Navbar() {
  // global state :
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const navigate = useNavigate()
  const handleLogout = () => {
    try{
      dispatch(authAction.logout())
      alert('logout successfully')
      navigate('/login')
    }
    catch(error){
      console.log(error)
    }
    
  }
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography>My Blog App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value} // The value of the currently selected Tab
                onChange={(e, val) => {
                  setValue(val);
                }}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} onClick={handleLogout}>
                LogOut
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
