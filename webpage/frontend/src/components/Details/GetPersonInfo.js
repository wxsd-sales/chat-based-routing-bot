import axios from "axios";

async function GetPersonInfo(accessToken) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };
  const url = process.env.REACT_APP_WEBEX_API + "people/me";

  const {
    data: { avatar, id },
  } = await axios.get(url, config);

  return { avatar, id };
}
export default GetPersonInfo;
