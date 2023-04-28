import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import * as constants from "../../constants";

function TeamDetails({ sendDataToParent, data, accessToken }) {
  const [teamID, setTeamID] = useState("");
  const [teamName, setTeamName] = useState("");
  const [count, setCount] = useState(0);
  const [teamDetailsArray, setTeamDetailsArray] = useState([]);
  let teamArray = [];

  const handleTeamIDChange = (e) => {
    console.log("e target", e.target);
    setTeamID(e.target.value);
    setTeamName(e.target.value);
  };

  useEffect(() => {
    console.log("data from edit details", data);
    if (count == 0 && data) {
      setTeamID(data);
      setCount(1);
    }
    sendDataToParent(teamID, teamName);
    const getTeamDetails = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      const url = process.env.REACT_APP_WEBEX_API + "teams";

      await axios.get(url, config).then((res) => {
        res.data.items.forEach(function (data, index) {
          const newItem = {
            id: data.id,
            name: data.name,
          };
          teamArray.push(newItem);
        });
      });
      setTeamDetailsArray(teamArray);
    };
    getTeamDetails();
  });

  const menuItems = teamDetailsArray.map((item) => (
    <MenuItem key={item.id} value={item.id}>
      {item.name}
    </MenuItem>
  ));

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h6">
          <b> Select Webex Team:</b>
        </Typography>
      </Grid>
      <Card sx={constants.styleCard} variant="outlined">
        <CardContent>
          <Grid item xs={12} sx={{ margin: 1 }}>
            <FormControl fullWidth>
              <InputLabel required id="demo-simple-select-label">
                Team
              </InputLabel>
              <Select
                required
                labelId="teamId"
                id="teamId"
                name={teamName}
                value={teamID}
                label="Team ID"
                onChange={handleTeamIDChange}
              >
                {menuItems}
              </Select>
            </FormControl>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default TeamDetails;
