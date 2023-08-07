import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'

import fs from 'fs'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const AWS_BUCKET_NAME='tesisloja';
const client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIAU2R2UBQ7YC3KRFUP',
        secretAccessKey: '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'
    }
})

export async function uploadFile(file) {
    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream
    }
    let url='https://tesisloja.s3.amazonaws.com/'+file.name;
    const command = new PutObjectCommand(uploadParams);
    console.log(url);
    return  [await client.send(command),url]
}

