import {
  SNSClient,
  PublishCommand,
  SubscribeCommand,
} from "@aws-sdk/client-sns";

const config = {
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

export const Subsribe = async () => {
  try {
    const client = new SNSClient(config);

    const input = {
      TopicArn: "arn:aws:sns:ap-south-1:894557541083:aquadrop-sns",
      Protocol: "sms",
      Endpoint: "+917083448763",
    };

    const command = new SubscribeCommand(input);
    const response = await client.send(command);
    return response;
  } catch (err) {
    return err;
  }
};

export const PublishMessage = async () => {
  try {
    const client = new SNSClient(config);
    const input = {
      PhoneNumber: "+919172717332",
      Message: "Hello",
      Subject: "Order at Aquadrop",
      MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
          DataType: "String",
          StringValue: "String",
        },
      },
      MessageDeduplicationId: "100",
      MessageGroupId: "100",
    };
    const command = new PublishCommand(input);
    const response = await client.send(command);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
