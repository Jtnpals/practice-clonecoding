import withHandler from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  ok: boolean;
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.json({ ok: true });
}

export default withHandler("POST", handler);
