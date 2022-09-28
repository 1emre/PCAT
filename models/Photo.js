const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: +new Date() + 7 * 24 * 60 * 60 * 1000,
  },
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
