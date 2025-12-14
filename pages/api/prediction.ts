import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveStopPrediction } from "../../functions/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Foli.StopPrediction | Message>
) {
  try {
    if (req.method !== "GET") {
      res.status(405).send({ message: "Only GET requests allowed!" });
      return;
    }

    const key = req?.query?.key?.toString() as string;

    if (!key) {
      res.status(400).send({ message: "Invalid query parameter!" });
      return;
    }

    const prediction = await retrieveStopPrediction(key);

    if ("message" in prediction) {
      throw new Error();
    }
    return res.status(200).send(prediction);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "Internal server error, please try again" });
  }
}
