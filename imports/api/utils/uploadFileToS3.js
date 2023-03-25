import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client.js";

/**
 * Upload any file to AWS S3 (classic way)
 *
 * @param {*} file
 * @param {String} folder
 * @param {String} userId
 * @param {String} identifier
 * @param {String} savedKey
 * @returns Object
 */

const uploadFileToS3 = async (file, folder, userId, identifier, savedKey) => {
  console.log("uploadFileToS3: started", {
    fileName: file.originalname,
    folder,
    userId,
    identifier,
    savedKey,
  });
  // create the S3 bucket params
  const bucketParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${folder}${userId}/${Date.now()}-${identifier}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  if (savedKey) {
    // delete image from s3
    const s3SendDeleteObjectCommandResult = await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketParams.Bucket,
        Key: savedKey,
      }),
    );
    console.log("uploadFileToS3: object deleted", s3SendDeleteObjectCommandResult);
    // if (s3SendDeleteObjectCommandResult?.$metadata?.httpStatusCode !== 200) {
    //   return res.status(500).json({
    //     success: false,
    //     message:
    //       "Failed to upload image. Unable to remove the previous saved image.",
    //     imageUrl: null,
    //   });
    // }
  }

  // upload the file to S3
  const s3SendPutObjectCommandResult = await s3Client.send(new PutObjectCommand(bucketParams));
  let statusCode = s3SendPutObjectCommandResult?.$metadata?.httpStatusCode;
  console.log("uploadFileToS3: attemped to attach new object", { statusCode });

  return {
    success: statusCode === 200,
    message: `Upload ${statusCode !== 200 ? "successful" : "failed"}`,
    bucket: bucketParams.Bucket,
    key: bucketParams.Key,
  };
};

export default uploadFileToS3;
