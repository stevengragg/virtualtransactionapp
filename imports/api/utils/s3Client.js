import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = process.env.AWS_S3_REGION || "us-east-1";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
export { s3Client };
