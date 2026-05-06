import { jwtVerify, SignJWT } from 'jose';

const accessTokenSecret = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET,
);

type AccessTokenPayload = {
  userId: string | number;
  email: string;
};

export const createAccessToken = async (payload: AccessTokenPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(accessTokenSecret);
};

export const verifyAccessToken = async (token: string) => {
  const { payload } = await jwtVerify(token, accessTokenSecret);
  return payload;
};
