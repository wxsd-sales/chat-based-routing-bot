import Copyright from "../Layout/Copyright";
import Navbar from "../Layout/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GetPersonInfo from "../Details/GetPersonInfo";
import GetMongoData from "../DataHandling/GetMongoData";

function EndPage() {
  const { state } = useLocation();
  let navigate = useNavigate();
  const [personDataFound, setPersonDataFound] = useState("2");

  useEffect(() => {
    console.log("entered");
    const mongoData = () => {
      GetPersonInfo(state.accessToken).then((data) => {
        console.log("got person info");
        navigate("/details", {
          state: {
            personID: data.id,
            avatar: data.avatar,
            accessToken: state.accessToken,
          },
        });
        GetMongoData().then((mondata) =>
          mondata.every((element) => {
            if (data.id === element.personID) {
              navigate("/editdetails", {
                state: {
                  avatar: data.avatar,
                  personID: data.id,
                  data: element,
                  id: element.id,
                  accessToken: state.accessToken,
                },
              });
              setPersonDataFound("0");
              console.log("person found");
              return false;
            } else if (data.id !== element.personID) {
              console.log("person not found");
              setPersonDataFound("1");
              return true;
            }
          })
        );
        if (personDataFound === "1") {
          console.log("person not found");
          navigate("/details", {
            state: {
              personID: data.id,
              avatar: data.avatar,
              accessToken: state.accessToken,
            },
          });
        }
      });
    };
    mongoData();
  });

  return (
    <>
      <Navbar avatar={state.avatar} isLogin={false} />
      <Copyright />
    </>
  );
}
export default EndPage;
