import { Lambda } from "@aws-sdk/client-lambda";

const lambda = new Lambda({
  region: "us-west-2",

  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const lambdaName = "myLambdaFunction";

export default function handler(req, res) {
  if (req.method === "POST") {
    var values = req.body;
    const params = {
      FunctionName: lambdaName, // replace with your function name
      Payload: JSON.stringify(values), // replace with your payload
    };
    console.log("Inside subscribe post endpoint")

    lambda.invoke(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else if (parseInt(data.Payload) === 200) {
        console.log("success");
        res.status(200).json({});
      } else if (parseInt(data.Payload) === 201) {
        console.log("already subscribed");
        res.status(201).json({});
      }
    });
  }

  if (req.method === "GET") {
    var values = req.body;
    values["method"] = "GET";

    const params = {
      FunctionName: lambdaName,
      Payload: JSON.stringify(values),
    };
    lambda.invoke(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
        console.log(type(data));
        res.status(201).json({ response: data });
      }
    });
  }
}
