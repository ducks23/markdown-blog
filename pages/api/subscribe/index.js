export default function handler(req, res) {
  if (req.method === "POST") {
    var values = req.body;

    const lambda = new AWS.Lambda({
      region: "us-west-2",
      accessKeyId: "AKIASV7FIZCBAKETOV6T", //process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: "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", //process.env.AWS_SECRET_ACCESS_KEY,
    });
    values["action"] = "add";

    const params = {
      FunctionName: "myLambdaFunction", // replace with your function name
      Payload: JSON.stringify(values), // replace with your payload
    };
    lambda.invoke(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else if (parseInt(data.Payload) === 200) {
        emailjs
          .send(
            "service_jc1unvt",
            "template_rued7sh",
            values,
            "K2i9c6y8AURAqNsTW"
          )
          .then(
            () => {
              console.log("success");
            },
            (err) => {
              console.log(err);
              res.status(400).json({ text: err });
            }
          );
      } else if (parseInt(data.Payload) === 201) {
      }
    });
  }
}
