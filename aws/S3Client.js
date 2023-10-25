import dotenv from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { generateRandomString } from "../utils/helpers.js";

dotenv.config();

const AWS_REGION = process.env.AWS_REGION;
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

const client = new S3Client({ region: AWS_REGION });

/**
 * Inserts a file in S3
 * @param {string} key - Object name
 * @param {Buffer} file - The file itself
 * @returns {string} - File name
 */
export const insertObject = async (key, file) => {
  const putObjectCommand = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: key,
    Body: file,
  });
  await client.send(putObjectCommand);
  return key;
};

/**
 * Inserts multiple files in S3
 * @param {Buffer} files - The files
 * @returns {string[]} Array of image file names
 */
export const insertMultipleObjects = async (files) => {
  let keys = [];
  const putObjectCommands = [];

  for (const file of files) {
    console.log("file", file);
    const fileName = `${generateRandomString()}-${file.originalname}`;
    const putObjectCommand = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: fileName,
      Body: file.buffer,
    });

    putObjectCommands.push(client.send(putObjectCommand));
    keys.push(fileName);
  }

  await Promise.all(putObjectCommands);
  return keys;
};
