import { generalRequest } from "./httpRequest";

async function PostData(personID, teamID, teamName, scenarioList, memberList) {
  try {
    const res = await generalRequest.post("/details", {
      personID,
      teamID,
      teamName,
      scenarioList,
      memberList,
    });
    if (res.data) {
      console.log("success", {
        personID,
        scenarioList,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default PostData;
