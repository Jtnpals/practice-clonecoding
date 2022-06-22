import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: phone } : email ? { email } : null;
  if (!user) {
    res.status(400).json({ ok: false });
  }
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (email) {
    // 이메일 전송
  }
  res.json({ ok: true });
}

export default withHandler({
  method: "POST",
  handler,
  isPrivate: false,
});