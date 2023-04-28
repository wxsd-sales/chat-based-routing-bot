import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import { useState } from "react";
import ScenarioDetails from "./ScenarioDetails";
import MemberDetails from "./MemberDetails";
import Copyright from "../Layout/Copyright";
import { useNavigate } from "react-router-dom";
import PostData from "../DataHandling/PostData";
import GetMongoData from "../DataHandling/GetMongoData";
import { generalRequest } from "../DataHandling/httpRequest";
import TeamDetails from "./TeamDetails";
import * as constants from "../../constants";

export default function Details() {
  const [scenarioList, setScenarioList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [lastMemberList, setLastMemberList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState("");
  const { state } = useLocation();
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrors("");
      await constants.validationSchema.validate(lastMemberList, {
        abortEarly: false,
      });
      const personID = state.personID;
      if (!state.isEdit) {
        await PostData(personID, teamId, teamName, scenarioList, memberList);
      }

      GetMongoData().then(
        (
          mondata //getting the existing mongo data
        ) =>
          mondata.every(async (element) => {
            if (personID === element.personID) {
              // checking if current person details exist in the db
              if (state.isEdit) {
                //checking if details page opens on clicking the edit button
                try {
                  const id = element._id;
                  const res = generalRequest.delete(`/details/${id}`);
                  if (res) {
                    await PostData(
                      personID,
                      teamId,
                      teamName,
                      scenarioList,
                      memberList
                    );
                    GetMongoData().then((mongdata) =>
                      mongdata.every(async (ele) => {
                        if (personID === ele.personID) {
                          navigate("/editdetails", {
                            state: {
                              avatar: state.avatar,
                              personID: personID,
                              data: ele,
                              id: ele.id,
                              accessToken: state.accessToken,
                            },
                          });
                          return false;
                        }
                      })
                    );
                  }
                } catch (error) {
                  console.log(error);
                }
              } else {
                navigate("/editdetails", {
                  state: {
                    avatar: state.avatar,
                    personID: personID,
                    data: element,
                    id: element.id,
                    accessToken: state.accessToken,
                  },
                });
                return false;
              }
            } else if (personID !== element.personID) {
              return true;
            }
          })
      );
    } catch (error) {
      setErrors(error.inner);
    }
  };

  const setScenarioDetails = (list) => {
    setScenarioList(list);
  };

  const setTeamDetails = (teamId, teamName) => {
    setTeamId(teamId);
    setTeamName(teamName);
  };
  const setMemberDetails = (list, currentList) => {
    setLastMemberList(currentList);
    setMemberList(list);
  };

  return (
    <ThemeProvider theme={constants.theme}>
      <Navbar
        avatar={state.avatar}
        isLogin={false}
        title="CUSTOMIZE YOUR BOT"
      />
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box sx={constants.styleDetailsBox}>
          {/* <Typography component="h5" variant="h4" align="center">
            <b>CUSTOMIZE HANNA BOT</b>
          </Typography> */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, mb: 3 }}
          >
            <Grid container spacing={2}>
              <ScenarioDetails
                isSubmit={isSubmit}
                sendDataToParent={setScenarioDetails}
                data={state.scenarioList}
              />

              <MemberDetails
                submitErrors={errors}
                sendDataToParent={setMemberDetails}
                data={state.memberList}
              />

              <TeamDetails
                sendDataToParent={setTeamDetails}
                data={state.teamId}
                accessToken={state.accessToken}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              color="cyan"
              variant="contained"
              sx={constants.styleButton}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
      <Copyright />
    </ThemeProvider>
  );
}
