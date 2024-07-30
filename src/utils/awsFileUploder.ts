import { s3 } from "@/config/awsConfig";

export const s3UploadMethod = async (
  selectedFiles: File[],
  folderName: string,
) => {
  console.log(selectedFiles);
  // Create upload promises for each file
  const uploadPromises = selectedFiles.map((file) => {
    const fileName = file.name;
    const key = `${folderName}/${fileName}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: file,
    };
    return s3
      .upload(params)
      .promise()
      .then(({ Location }) => Location)
      .catch((error) => {
        throw error;
      });
  });
  try {
    return await Promise.all(uploadPromises);
  } catch (error) {
    return error;
  }
};
