const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  //   const photos = await Photo.find({}).sort('-dateCreated');
  //   res.render('index', {
  //     photos,
  //   });
  const page = req.query.page || 1;
  const photoPerPage = 3;

  const totalPhotos = await Photo.find().countDocuments();

  const photos = await Photo.find({})
    .sort('dateCreated')
    .skip((page - 1) * photoPerPage)
    .limit(photoPerPage);

  res.render('index', {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photoPerPage),
  });
};
exports.getPhoto = async (req, res) => {
  //console.log(req.params.id);
  //res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};
exports.createPhoto = async (req, res) => {
  //console.log(req.files.image);
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    // Bunun için const fs = require('fs'); almamız gerekir.
    fs.mkdirSync(uploadDir);
  }
  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
};
exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};
exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deleteImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deleteImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
