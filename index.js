const AWS = require('aws-sdk');
const request = require('request-promise')


const s3 = new AWS.S3({
    accessKeyId: '[]',
    secretAccessKey: '[]'
})

const imagesUrl = 'https://loremflickr.com/320/240/eggs';

const options = {
    uri: imagesUrl,
    encoding: null
};

async function load() {

    const body = await request(options)

    const uploadResult = await s3.upload({
        Bucket: 'bas-c',
        Key: 'bg.jpg',
        Body: body,
    }).promise()

}

