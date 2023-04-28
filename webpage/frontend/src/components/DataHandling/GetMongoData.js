import { generalRequest } from "./httpRequest";

async function GetMongoData() {
  try {
    return await generalRequest.get("/details").then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
}

export default GetMongoData;
