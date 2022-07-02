import withHandler, { ResponseType } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withSession from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    body,
    session: { user },
  } = req;
  if (!id) return;
  const message = await client.message.create({
    data: {
      message: body.message,
      stream: {
        connect: {
          id: +id,
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({ ok: true, message });
}

export default withSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
