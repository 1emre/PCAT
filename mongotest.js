const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect localDb
// mongoose.connect('mongodb://localhost/pcat-test-db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

//connect DB
mongoose.connect(
  'mongodb+srv://dpedemirbas:admin@mongode.b9b53vk.mongodb.net/pcat-test-db?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//crete a photo
// Photo.create({
//     title: "Photo Title 1",
//     description: "Photo description 1 lorem ipsum"
// });

// Photo.create({
//     title: "Photo Title 2",
//     description: "Photo description 2 lorem ipsum"
// });

//read photo
// Photo.find({}, (err,data) => {
//     console.log(data);
// });

//update photo
// const id = '6332ae17e85976459ee7db12';

// Photo.findByIdAndUpdate(id,{
//     title: 'Photo Title 11 updated',
//     description: 'Photo description 11 updated'
//     },
//     {
//         new: true
//     },
//     (err,data) => {
//         console.log(data);
//     }
// );

//delete photo
const id = '6332b366a69a6c602c4efc10';

Photo.findByIdAndDelete(id, (err, data) => {
  console.log('Photo is removed...');
});
