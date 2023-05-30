import aws from "aws-sdk"

const spacesEndpoint = new aws.Endpoint("fra1.digitaloceanspaces.com");

aws.config.update({
    accessKeyId: "DO007JMJHRK4LWNUBBBE",
    secretAccessKey:"GjXG9G2sll8x5g5/s1mVwE9U9pamw+OgPk46u6aoY7Q" ,
    region: "ap-southeast-1"
  })

let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) {
    let s3 = new aws.S3({
      apiVersion: '2006-03-01'
      , endpoint: spacesEndpoint,
    });

    var uploadParams = {
      ACL: "public-read",
      Bucket: "18-candleriggs",
      Key: file.originalname,
      Body: file.buffer
    }

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ "error": err })
      }

      return resolve(data.Location)
    });

  });
}

export default { uploadFile }