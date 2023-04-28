import mongoose from "mongoose";

const DetailSchema = new mongoose.Schema(
  {
    personID: String,
    teamID: String,
    teamName: String,
    scenarioList: [
      {
        scenario: { type: String },
      },
    ],
    memberList: [
      {
        name: { type: String },
        email: { type: String },
        isModerator: { type: Boolean },
      },
    ],
  },
  { timestamps: true }
);

//  {"_id":{"$oid":"63bb5e218480d18aa8488aae"},"person_id":"ZmM2YTE4ZmEtMGVmYi00NzM0LTg2MWMtYWU4NTUwMGEzNWViZWNhNDQwZDktOTE3_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f","scenario_types":[{"scenario_title":"IT Major Incident Telecom/Network (1-Begin)","notification_channel":["sms","call"]}]}

export default mongoose.model("Details", DetailSchema);
