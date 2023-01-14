// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveStops } from "../../functions/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Foli.Stop | Message>
) {
  try {
    if (req.method !== "GET") {
      res.status(405).send({ message: "Only GET requests allowed!" });
      return;
    }

    const stops = await retrieveStops();

    return res.status(200).send(stops);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "Internal server error, please try again" });
  }
}
