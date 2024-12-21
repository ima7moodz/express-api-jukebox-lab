const mongoose = require("mongoose")

const trackSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  artist: {
    type: String,
    require: true,
  },
})

const Track = mongoose.model("Track", trackSchema)
module.exports = Track
