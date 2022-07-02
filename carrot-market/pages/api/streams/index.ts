import withHandler, { ResponseType } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withSession from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;
  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price: +price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      stream,
    });
  }
  if (req.method === "GET") {
    const streams = await client.stream.findMany({
      orderBy: {
        id: "desc",
      },
      take: 10,
    });
    res.json({
      ok: true,
      streams,
    });
  }
}

export default withSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
