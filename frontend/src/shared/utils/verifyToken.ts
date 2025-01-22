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
    // Kiểm tra loại lỗi và xử lý phù hợp
    if (error instanceof Error && error.message.includes("JWT expired")) {
      console.log("Token has expired.");
      // Thực hiện các bước xử lý khi token hết hạn, ví dụ như làm mới token
      throw new Error("Token expired. Please log in again.");
    } else {
      console.log("Token verification failed:", error);
      throw new Error("Invalid token.");
    }
  }
}
