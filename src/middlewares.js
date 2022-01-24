import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import "dotenv/config";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});
const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "myrubee/images",
  acl: "public-read",
});
const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "myrubee/videos",
  acl: "public-read",
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.pageName = "Mytube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Login First!");
    return res.redirect("/login");
  }
};
export const publicOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    req.flash("error", "Not Autuorized");
    return res.redirect("/");
  } else {
    return next();
  }
};
export const uploadFiles = multer({
  dest: "uploads/thumb/",
  storage: s3ImageUploader,
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 10000000 },
  storage: s3VideoUploader,
});
export const thumbnailDowunload = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 10000000 },
  storage: s3ImageUploader,
});
