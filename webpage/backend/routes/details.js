import express from "express";
import Details from "../models/Details.js";

const router = express.Router();

//post request

router.post("/", async (req, res) => {
  const newDetail = new Details(req.body);

  try {
    const savedDetail = await newDetail.save();
    res.status(200).send(savedDetail);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get All Data

router.get("/", async (req, res) => {
  try {
    const details = await Details.find();

    res.status(200).send(details);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    const details = await Details.findByIdAndDelete(req.params.id);
    res.status(200).send(details);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update

router.put("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const details = await Details.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send(details);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
