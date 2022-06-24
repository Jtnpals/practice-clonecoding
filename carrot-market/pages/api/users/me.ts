import withHandler, { ResponseType } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withSession from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.user);

  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });
  res.json({
    ok: true,
    profile,
  });
}

export default withSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
