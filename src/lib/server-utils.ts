"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function gerDecodedToken() {
  const encodedToken = (await cookies()).get("next-auth.session-token")?.value;
  const decodedToken = await decode({
    token: encodedToken,
    secret: process.env.AUTH_SECRET!,
  });
  return decodedToken;
}
export async function getUserToken() {
  return (await gerDecodedToken())?.token;
}
export async function getUserId() {
  const decodedToken = (await gerDecodedToken())?.token;
  const userPayload = decodedToken?.split(".")[1] as string;
  const userDecodedData = JSON.parse(atob(userPayload));
  return userDecodedData.id;
}
