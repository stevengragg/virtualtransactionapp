import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
// Utils
import { ALLOWED_IMAGE_TYPE, MAX_IMG_FILE_SIZE } from "./constants";

const multerUploadImg = multer({
  //   storage: multerS3({
  //     s3: s3,
  //     bucket: process.env.AWS_S3_BUCKET_NAME,
  //     cacheControl: "max-age=31536000",
  //     acl: "public-read",
  //     metadata: function (req, file, cb) {
  //       cb(null, { fieldName: file.fieldname });
  //     },
  //     key: function (req, file, cb) {
  //       const userId = req.userId;
  //       console.log("multerUploadImg: key", {
  //         userId,
  //         file: file.originalname,
  //         destination: process.env.AWS_S3_IMAGE_FOLDER,
  //       });
  //       cb(
  //         null,
  //         `${process.env.AWS_S3_IMAGE_FOLDER}${userId}/${file.originalname}`
  //       );
  //     },
  //   }),
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_IMG_FILE_SIZE, // limit file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/) || !ALLOWED_IMAGE_TYPE.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

export { multerUploadImg };
