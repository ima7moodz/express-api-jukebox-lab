const Track = require("../models/track")
const express = require("express")
const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const createTrack = await Track.create(req.body)
    res.status(201).json(createTrack)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/", async (req, res) => {
  try {
    const foundTracks = await Track.find()
    res.status(200).json(foundTracks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:trackId", async (req, res) => {
  try {
    const foundTracks = await Track.findById(req.params.trackId)
    if (!foundTracks) {
      res.status(404)
      throw new Error("Pet not found.")
    }
    res.status(200).json(foundTracks)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.delete("/:trackId", async (req, res) => {
  try {
    const deleteTrack = await Track.findByIdAndDelete(req.params.trackId)
    res.status(200).json(deleteTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.put("/:trackId", async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.trackId,
      req.body,
      {
        new: true,
      }
    )
    if (!updatedTrack) {
      res.status(404)
      throw new Error("Track not found.")
    }
    res.status(200).json(updatedTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

module.exports = router
