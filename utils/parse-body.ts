
import { NextRequest } from 'next/server';
import type { z } from 'zod';

export const parseBody = async <TSchema extends z.ZodTypeAny>({
  req,
  schema,
}: {
  req: NextRequest;
  schema: TSchema;
}) => {
  const body = await req.json();
  return schema.safeParse(body);
};
