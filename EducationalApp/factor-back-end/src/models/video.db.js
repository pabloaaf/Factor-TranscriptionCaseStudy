// Video.Model.js
const mongoose = require("mongoose");
var jwt = require('jsonwebtoken');

// schema
const videoSchema = new mongoose.Schema({
    name: { type: String}, //video name.
    url: { type: String}, //statics server url
    duration: { type: String}, //min or seconds?.
    class: { type: Number}, // Ordering the videos with upload time.
    thumbnail: { type: String}, //statics server url
    courseID: { type: String} //The course of the video.
},{collection: 'VideoCo'});

const Video = mongoose.model("Video", videoSchema, "VideoCo");
module.exports = Video;