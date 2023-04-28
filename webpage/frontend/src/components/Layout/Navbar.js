import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import * as constants from "../../constants";

function Navbar(details) {
  let navigate = useNavigate();
  const handleLogout = async () => {
    window.open(process.env.REACT_APP_LOGOUT, "_self");
  };
  const ava = details.avatar;
  return (
    <ThemeProvider theme={constants.theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="cyan">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} src={ava} />
            </IconButton>
            <Typography
              variant="h5"
              component="h5"
              sx={{ flexGrow: 1 }}
              align="center"
            >
              <b>{details.title}</b>
            </Typography>
            <Button
              type="submit"
              align="center"
              variant="outlined"
              color="white"
              sx={constants.styleButton}
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Navbar;
