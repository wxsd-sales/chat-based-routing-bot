import { ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useNavigate } from "react-router-dom";
import "./index.css";
import * as constants from "../../constants";

function Demo() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const handleBack = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={constants.theme}>
      <div className="navDemo">
        <div className="navContainerDemo">
          <div className="navLeftDemo">
            <div className="navLogoDemo">
              <IconButton size="medium" color="inherit" aria-label="menu">
                <Avatar sx={constants.styleAvatar} src={state.avatar} />
              </IconButton>{" "}
              <div className="navLogoTextDemo">Hanna Bot</div>
            </div>
          </div>
          <div className="navRightDemo">
            <div className="navButtonsDemo">
              <Button
                type="submit"
                align="center"
                variant="outlined"
                color="white"
                sx={constants.styleBackButton}
                onClick={handleBack}
                startIcon={<ArrowLeftIcon />}
              >
                Back
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
        sx={{ mt: 3 }}
      >
        <Grid item xs={12} align="center" justify="center">
          <Typography component="h1" variant="h5">
            <b>Hanna Bot Demo Video</b>
          </Typography>
        </Grid>
        <Grid item xs={12} align="center" justify="center">
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/kjve61ZexiQ`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Demo;
