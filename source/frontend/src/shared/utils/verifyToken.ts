import envConfig from "@/shared/config/config";
import { deleteCookie } from "cookies-next";
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
    if (error instanceof Error && error.message.includes("JWT expired")) {
      console.log("Token has expired.");
      throw new Error("Token expired. Please log in again.");
    } else {
      if (error instanceof Error && error.message.includes("JWT expired")) {
        console.log("Token has expired.");
      } else {
        console.log("Token verification failed:", error);
      }
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
      }
      deleteCookie("auth_token");
    }
  }
}
