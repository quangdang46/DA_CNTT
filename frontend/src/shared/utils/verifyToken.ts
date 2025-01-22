import envConfig from "@/shared/config/config";
import { jwtVerify } from "jose";
export const getJwtSecretKey = () => {
  const secret = envConfig.NEXT_PUBLIC_JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set.");
  }
  return secret;
};
export async function verifyJwtToken(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(envConfig.NEXT_PUBLIC_JWT_SECRET)
    );
    return verified.payload;
  } catch (error) {
    console.log(error);
    // throw new Error("Invalid or expired token.");
  }
}
