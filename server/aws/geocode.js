import {
  LocationClient,
  SearchPlaceIndexForTextCommand,
} from "@aws-sdk/client-location";

export const GeocodeAddress = async (a) => {
  const config = {
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  };
  const client = new LocationClient(config);
  const input = {
    IndexName: "AquadropIndex",
    Text: a,
  };
  try {
    const command = new SearchPlaceIndexForTextCommand(input);
    const response = await client.send(command);
    return { Locations: response.Results };
  } catch (err) {
    console.log(err);
  }
};
