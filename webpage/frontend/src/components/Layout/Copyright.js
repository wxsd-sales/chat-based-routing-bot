import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function Copyright(props) {
  return (
    <Box
      fullWidth
      direction="row"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100px",
        backgroundColor: "#D3D3D3",
      }}
    >
      <Grid
        conatiner
        sx={{
          marginTop: "50px",
        }}
      >
        <Typography variant="body1" align="center" {...props}>
          <b>{"Chat Based Routing Bot "}</b>
          {"by "}
          <Link color="inherit" href={process.env.REACT_APP_WXSD_SALES_URL}>
            WXSD-SALES
          </Link>
        </Typography>
        <Typography variant="body2" align="center" {...props}>
          {"Copyright © "}
          {new Date().getFullYear()}
          {" Webex by Cisco"}
          {"."}
        </Typography>
      </Grid>
    </Box>
  );
}

export default Copyright;
