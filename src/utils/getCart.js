// app/(shop)/actions/getCart.ts
"use server";

import { cookies } from "next/headers";

export async function getCart() {
  const cookieStore = cookies();
  const cart = cookieStore.get("cart")?.value;

  return cart ? JSON.parse(cart) : [];
}
