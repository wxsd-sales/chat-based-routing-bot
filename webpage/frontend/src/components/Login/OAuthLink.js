import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Copyright from "../Layout/Copyright";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import backgroundImage from "../../images/hanna_bg_final.jpg";
import "./index.css";
import * as constants from "../../constants";
import avatar from "../../images/cb-bot.png";

function OAuthLink({ clientID, loginText, redirectURI, webexAPIBaseURL }) {
  // const avatar = process.env.REACT_APP_DEFAULT_AVATAR;
  const handleLogin = () => {
    window.open(
      `${webexAPIBaseURL}?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=spark%3Aall%20spark%3Akms`,
      "_self"
    );
  };

  return (
    <ThemeProvider theme={constants.theme}>
      <div className="nav">
        <div className="navContainer">
          <div className="navLeft">
            <div className="navLogo">
              <IconButton size="medium" color="inherit" aria-label="menu">
                <Avatar
                  sx={{ m: -1, bgcolor: "secondary.main" }}
                  src={avatar}
                />
              </IconButton>{" "}
              <div className="navLogoText">Chat Based Routing Bot</div>
            </div>
          </div>
          <div className="navRight">
            <div className="navButtons">
              <Button
                type="submit"
                align="center"
                variant="contained"
                color="cyan"
                sx={constants.styleButton}
                onClick={handleLogin}
                startIcon={<LogoutIcon />}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="background">
        <div className="bgImage">
          <img className="hannaBg" src={backgroundImage} alt="hannaBg" />
          <div className="bgTextWrapper">
            <div className="bgText">
              <h1>Connect</h1>
              <h3>Instantly</h3>
              <p>
                <b>
                  Get instant connection to a group of experts and solve
                  problems quickly using Webex SDK and APIs
                </b>
              </p>
              <Button
                type="submit"
                variant="contained"
                color="cyan"
                sx={constants.styleCustomizeButton}
                onClick={handleLogin}
              >
                Customize your bot
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Grid
        container
        spacing={2}
        padding={2}
        alignContent="center"
        justify="center"
        sx={{ mt: 4, mb: 8 }}
      >
        {/* <Grid item xs={12} align="center" justify="center">
          <Typography component="h1" variant="h5">
            <b>Hanna Bot Demo Video</b>
          </Typography>
        </Grid>
        <Grid item xs={12} align="center" justify="center">
          <iframe
            width="853"
            height="480"
            src={process.env.REACT_APP_HANNA_DEMO_URL}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </Grid> */}
      </Grid>
      <Copyright />
    </ThemeProvider>
  );
}

OAuthLink.propTypes = {
  clientID: PropTypes.string.isRequired,
  loginText: PropTypes.string.isRequired,
  redirectURI: PropTypes.string.isRequired,
  webexAPIBaseURL: PropTypes.string.isRequired,
};

export default OAuthLink;
