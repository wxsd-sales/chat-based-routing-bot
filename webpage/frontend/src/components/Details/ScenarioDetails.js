import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ThemeProvider } from "@mui/material/styles";
import * as constants from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";

function ScenarioDetails({ isSubmit, sendDataToParent, classes, data }) {
  const [scenarioList, setScenarioList] = useState([{ scenario: "" }]);
  const [error, setError] = useState("");
  const [helperText, setHelperText] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count == 0 && data) {
      setScenarioList(data);
      setCount(1);
    }
    sendDataToParent(scenarioList);
  });

  const handleScenarioAdd = async () => {
    setScenarioList([
      ...scenarioList,
      {
        scenario: "",
      },
    ]);
  };

  const handleScenarioRemove = (index) => {
    const list = [...scenarioList];
    list.splice(index, 1);
    setScenarioList(list);
  };

  const handleScenarioTitleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...scenarioList];
    list[index][name] = value;
    if (value.length < 3) {
      setError(true);
      setHelperText("Value must be at least 3 characters");
    } else {
      setError(false);
      setHelperText("");
    }
    setScenarioList(list);
  };

  // const handleScenarioSMSChange = (e, index) => {
  //   const { value, checked } = e.target;
  //   const list = [...scenarioList];
  //   list[index][value] = checked;
  //   setScenarioList(list);
  // };

  // const handleScenarioCallChange = (e, index) => {
  //   const { value, checked } = e.target;
  //   const list = [...scenarioList];
  //   list[index][value] = checked;
  //   setScenarioList(list);
  // };

  // const handleScenarioEmailChange = (e, index) => {
  //   const { value, checked } = e.target;
  //   const list = [...scenarioList];
  //   list[index][value] = checked;
  //   setScenarioList(list);
  // };

  return (
    <ThemeProvider theme={constants.theme}>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h6">
            <b>Enter Request Types:</b>
          </Typography>
        </Grid>
        {scenarioList.map((singleScenario, index) => (
          <Card sx={constants.styleCard} variant="outlined">
            <CardContent>
              <Grid item xs={12} sx={{ margin: 1 }}>
                <TextField
                  autoComplete="scenario"
                  name="scenario"
                  required
                  fullWidth
                  id="scenario"
                  label="Title"
                  autoFocus
                  value={singleScenario.scenario}
                  onChange={(e) => handleScenarioTitleChange(e, index)}
                  error={index === scenarioList.length - 1 && error}
                  helperText={helperText}
                />
              </Grid>
              {/* <FormControl
                sx={{ m: 1, mt: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">Notification Type</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="sms"
                    control={<Checkbox />}
                    label="SMS"
                    labelPlacement="sms"
                    checked={singleScenario.sms}
                    onChange={(e) => handleScenarioSMSChange(e, index)}
                  />
                  <FormControlLabel
                    value="call"
                    checked={singleScenario.call}
                    control={<Checkbox />}
                    label="Call"
                    labelPlacement="call"
                    onChange={(e) => handleScenarioCallChange(e, index)}
                  />
                  <FormControlLabel
                    value="email"
                    checked={singleScenario.email}
                    control={<Checkbox />}
                    label="Email"
                    labelPlacement="email"
                    onChange={(e) => handleScenarioEmailChange(e, index)}
                  />
                </FormGroup>
              </FormControl> */}

              {scenarioList.length > 1 && (
                <Grid item xs={12} align="center">
                  <Button
                    variant="outlined"
                    size="medium"
                    color="error"
                    sx={constants.styleButton}
                    startIcon={<RemoveIcon />}
                    onClick={() => handleScenarioRemove(index)}
                  >
                    Remove Scenario
                  </Button>
                </Grid>
              )}
            </CardContent>
          </Card>
        ))}

        {scenarioList.length < 5 && (
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              onClick={handleScenarioAdd}
              color="cyan"
              sx={constants.styleButton}
              startIcon={<AddIcon />}
            >
              Add Scenarios
            </Button>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}

export default ScenarioDetails;
